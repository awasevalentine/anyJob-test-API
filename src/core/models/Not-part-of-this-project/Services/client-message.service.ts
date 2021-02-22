import { Injectable } from "@nestjs/common";
import { MessageData } from "../../interface/portfolio-message.interface";
import { clientMessage } from "../mail/messaging.portfolio";


@Injectable()

export class ClientMessageService {
  

  constructor(){}

   async message(data: MessageData): Promise<void> {
    return await clientMessage(data);
  }
}