import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanRequestController } from './app/controllers/loan-request.controller';
import { LoanRequestService } from './core/services/loan-request.service';
import { Loan } from './core/models/entities/loan.entity';
import { ConfigModule } from '@nestjs/config';
import { ClientMessageService } from './core/models/Not-part-of-this-project/Services/client-message.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DB_NAME || 'loanRqstDb',
      entities: [Loan],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Loan]),
  ],
  controllers: [AppController, LoanRequestController],
  providers: [AppService, LoanRequestService, ClientMessageService],
})
export class AppModule {}
