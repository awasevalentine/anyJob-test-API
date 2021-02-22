import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageData } from './core/models/interface/portfolio-message.interface';
import { ClientMessageService } from './core/models/Not-part-of-this-project/Services/client-message.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService, private _clientMessageService: ClientMessageService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
  // this route is not for this particular app, its for receiving g messages from client on my portfolio app

  @Post("/message")
  async clientMessage(@Body() content: MessageData): Promise<void> {
    return await this._clientMessageService.message(content);
  } 
}
