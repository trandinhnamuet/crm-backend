import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RouteTemplate } from '../route_template/route_template.entity';
import { RouteInstance } from '../route_instance/route_instance.entity';
import { RouteTemplateCustomer } from '../route_template_customer/route_template_customer.entity';
import { RouteInstanceCustomer } from '../route_instance_customer/route_instance_customer.entity';
import { FileLoggerService } from '../../logger/file-logger.service';

@Injectable()
export class DailyScanRouteTemplateService {
  private readonly logger = new FileLoggerService(DailyScanRouteTemplateService.name);

  constructor(
    @InjectRepository(RouteTemplate)
    private routeTemplateRepository: Repository<RouteTemplate>,
    @InjectRepository(RouteInstance)
    private routeInstanceRepository: Repository<RouteInstance>,
    @InjectRepository(RouteTemplateCustomer)
    private routeTemplateCustomerRepository: Repository<RouteTemplateCustomer>,
    @InjectRepository(RouteInstanceCustomer)
    private routeInstanceCustomerRepository: Repository<RouteInstanceCustomer>,
  ) { }

  // Chạy hàng ngày lúc 1h sáng theo giờ Việt Nam
  // @Cron('0 1 * * *', {
  @Cron('5 14 * * *', {
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async scanRouteTemplates() {
    this.logger.log('Bắt đầu quét route templates để tạo route instances...');

    try {
      // Lấy tất cả route template đang active
      const routeTemplates = await this.routeTemplateRepository.find({
        where: { is_active: true },
      });

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset về đầu ngày

      for (const template of routeTemplates) {
        //logger đang kiểm tra template có repeat type và repeat on
        this.logger.log(`Kiểm tra template ${template.id} - ${template.name} với repeat type: ${template.repeat_type} và repeat on: ${template.repeat_on}`);
        this.logger.log(this.shouldCreateInstance(template, today))
        if (this.shouldCreateInstance(template, today)) {
          await this.createRouteInstanceWithCustomers(template, today);
        }
      }

      this.logger.log('Hoàn thành quét route templates');
    } catch (error) {
      this.logger.error('Lỗi khi quét route templates:', error);
    }
  }

  private shouldCreateInstance(template: RouteTemplate, today: Date): boolean {
    const { repeat_type, repeat_on, start_date, end_date } = template;

    // Kiểm tra nếu hôm nay nằm trong khoảng thời gian của template
    if (today < new Date(start_date) || today > new Date(end_date)) {
      return false;
    }

    if (repeat_type === 'WEEKLY') {
      // repeat_on: 2=Monday, 3=Tuesday, ..., 7=Saturday, 8=Sunday
      // today.getDay(): 0=Sunday, 1=Monday, ..., 6=Saturday
      const dayOfWeek = today.getDay() === 0 ? 8 : today.getDay() + 1;
      // dayOfWeek: 2=Monday, ..., 7=Saturday, 8=Sunday
      return repeat_on === dayOfWeek;
    }

    if (repeat_type === 'MONTHLY') {
      // repeat_on: ngày trong tháng (1-31)
      const dayOfMonth = today.getDate();
      return dayOfMonth === repeat_on;
    }

    return false;
  }

  private calculateEndDate(template: RouteTemplate, startDate: Date): Date | null {
    if (template.repeat_type === 'WEEKLY') {
      // repeat_on: 2=Monday, 3=Tuesday, ..., 7=Saturday, 8=Sunday
      // End date sẽ là 1 ngày trước repeat_on của tuần tiếp theo
      const targetDayOfWeek = template.repeat_on === 8 ? 0 : template.repeat_on - 1; // Chuyển về 0-6 format
      
      // Tìm ngày repeat_on của tuần tiếp theo
      const nextWeekRepeatDay = new Date(startDate);
      nextWeekRepeatDay.setDate(startDate.getDate() + 7); // Cộng 7 ngày để lên tuần sau
      
      // Điều chỉnh để về đúng ngày repeat_on trong tuần sau
      const currentDayOfWeek = nextWeekRepeatDay.getDay();
      let daysToAdjust = targetDayOfWeek - currentDayOfWeek;
      if (daysToAdjust !== 0) {
        nextWeekRepeatDay.setDate(nextWeekRepeatDay.getDate() + daysToAdjust);
      }
      
      // End date = repeat_on tuần sau - 1 ngày
      const endDate = new Date(nextWeekRepeatDay);
      endDate.setDate(nextWeekRepeatDay.getDate() - 1);
      return endDate;
    }
    
    if (template.repeat_type === 'MONTHLY') {
      // repeat_on: ngày trong tháng (1-31)
      let targetMonth = startDate.getMonth();
      let targetYear = startDate.getFullYear();
      // Tính số ngày trong tháng hiện tại
      const daysInCurrentMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
      const targetDay = Math.min(template.repeat_on, daysInCurrentMonth);
      let repeatDateThisMonth = new Date(targetYear, targetMonth, targetDay);
      let endDate;
      if (startDate < repeatDateThisMonth) {
        // Nếu hôm nay chưa đến ngày repeat_on tháng này, end_date là repeat_on-1 tháng này
        endDate = new Date(targetYear, targetMonth, targetDay - 1);
      } else {
        // Nếu đã qua, end_date là repeat_on-1 tháng sau
        let nextMonth = targetMonth + 1;
        let nextYear = targetYear;
        if (nextMonth > 11) {
          nextMonth = 0;
          nextYear += 1;
        }
        const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
        const nextTargetDay = Math.min(template.repeat_on, daysInNextMonth);
        endDate = new Date(nextYear, nextMonth, nextTargetDay - 1);
      }
      return endDate;
    }
    
    return null;
  }

  // Hàm public để tạo route instance từ template ID
  async createInstanceFromTemplate(templateId: number, date?: Date): Promise<void> {
    const targetDate = date || new Date();
    targetDate.setHours(0, 0, 0, 0); // Reset về đầu ngày

    // Lấy thông tin route template
    const template = await this.routeTemplateRepository.findOne({
      where: { id: templateId },
    });

    if (!template) {
      throw new Error(`Route template với ID ${templateId} không tồn tại`);
    }

    if (!template.is_active) {
      throw new Error(`Route template ${templateId} không active`);
    }

    await this.createRouteInstanceWithCustomers(template, targetDate);
  }

  private async createRouteInstanceWithCustomers(template: RouteTemplate, date: Date) {
    this.logger.log(`Tạo route instance cho template ${template.code} - ${template.name}`);

    try {
      // Kiểm tra xem đã tồn tại route instance cho ngày này chưa
      const existingInstance = await this.routeInstanceRepository.findOne({
        where: {
          route_template_id: template.id,
          start_date: date,
        },
      });

      if (existingInstance) {
        this.logger.log(`Route instance đã tồn tại cho template ${template.id} ngày ${date.toISOString().split('T')[0]}`);
        return;
      }

      // Tạo route instance mới
      const routeInstance = new RouteInstance();
      routeInstance.route_template_id = template.id;
      routeInstance.start_date = date;
      routeInstance.end_date = this.calculateEndDate(template, date);
      routeInstance.assignedEmployeeId = template.assignedEmployeeId;
      routeInstance.is_finished = false;
      routeInstance.created_at = new Date();

      const savedInstance = await this.routeInstanceRepository.save(routeInstance);

      // Lấy tất cả customers của template này
      const templateCustomers = await this.routeTemplateCustomerRepository.find({
        where: { route_template_id: template.id },
      });

      // Tạo route instance customer cho mỗi customer
      const instanceCustomers = templateCustomers.map(tc => {
        const instanceCustomer = new RouteInstanceCustomer();
        instanceCustomer.route_instance_id = savedInstance.id;
        instanceCustomer.customer_id = tc.customer_id;
        instanceCustomer.is_visited = false;
        return instanceCustomer;
      });

      if (instanceCustomers.length > 0) {
        await this.routeInstanceCustomerRepository.save(instanceCustomers);
        this.logger.log(`Đã tạo ${instanceCustomers.length} route instance customers cho template ${template.id}`);
      }

      this.logger.log(`Hoàn thành tạo route instance ${savedInstance.id} cho template ${template.id}`);
    } catch (error) {
      this.logger.error(`Lỗi khi tạo route instance cho template ${template.id}:`, error);
    }
  }
}
