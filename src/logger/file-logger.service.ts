import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService extends Logger {
  private logDir = path.join(process.cwd(), 'logs');
  
  constructor(context?: string) {
    super(context || 'Application');
    // Đảm bảo thư mục logs tồn tại
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private writeToFile(level: string, message: any, context?: string) {
    const timestamp = new Date().toISOString();
    const logContext = context || this.context || 'Application';
    const logMessage = `[${timestamp}] [${level}] [${logContext}] ${message}\n`;
    
    // Ghi vào file log hàng ngày
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, `app-${today}.log`);
    
    fs.appendFileSync(logFile, logMessage);
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.writeToFile('LOG', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeToFile('ERROR', `${message} ${trace ? '\n' + trace : ''}`, context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.writeToFile('WARN', message, context);
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.writeToFile('DEBUG', message, context);
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.writeToFile('VERBOSE', message, context);
  }
}
