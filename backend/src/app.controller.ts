import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('message')
  async setMessage(@Body('message') message: string) {
    try {
      const tx = await this.appService.setMessage(message);
      return { transactionHash: tx.hash };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('message')
  async getMessage() {
    try {
      const message = await this.appService.getMessage();
      return { message };
    } catch (error) {
      return { error: error.message };
    }
  }
}
