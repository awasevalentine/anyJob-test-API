import { Injectable } from "@nestjs/common";
import { MessageDto } from "../DTOs/client-message.model.dto";
import { clientMessage } from "../mail/messaging.portfolio";


@Injectable()

export class ClientMessageService {
  

  constructor(){}

   async message(data: MessageDto): Promise<void> {
    return await clientMessage(data);
  }
}