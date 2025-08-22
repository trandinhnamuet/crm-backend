import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAssignedEmployeeId1724227200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Thêm cột assignedEmployeeId cho bảng route_template
    await queryRunner.addColumn(
      'route_template',
      new TableColumn({
        name: 'assignedEmployeeId',
        type: 'integer',
        isNullable: true,
        comment: 'ID của nhân viên được phân công phụ trách tuyến',
      }),
    );

    // Thêm cột assignedEmployeeId cho bảng route_instance
    await queryRunner.addColumn(
      'route_instance',
      new TableColumn({
        name: 'assignedEmployeeId',
        type: 'integer',
        isNullable: true,
        comment: 'ID của nhân viên được phân công phụ trách tuyến instance',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa cột assignedEmployeeId từ bảng route_instance
    await queryRunner.dropColumn('route_instance', 'assignedEmployeeId');

    // Xóa cột assignedEmployeeId từ bảng route_template
    await queryRunner.dropColumn('route_template', 'assignedEmployeeId');
  }
}
