import { Body, Controller, Get, Ip, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoanRequestService } from '../../core/services/loan-request.service';
import { LoanRequestDTO } from '../../core/models/DTOs/loan-request.model';
import { response } from "express";

@Controller('api/loans')
@ApiTags("LoanRequests")
export class LoanRequestController {
   
    constructor(private _loanRequestService: LoanRequestService) {
        
    }

    // this method is use in fetching all existing loan request from the database

    @Get("request")
    async getLoanRequest(@Res() res) {
        var requests = await this._loanRequestService.getLoanRequests();
        return res.status(200).json(requests);
    }


    // this method handles loan request creation

    @Post("request/create")
    async createLoanRequest(@Body() loanRequest: LoanRequestDTO, @Res() res, @Ip() ip): Promise<any> {
        try {
            console.log(loanRequest);
            if(!loanRequest)
            return res.status(400).json({message: 'Invalid request. Empty request body'});
            loanRequest.requestIp = ip;
            this._loanRequestService.createLoanRequest(loanRequest).then(
            (response) => {
                return res.status(201).json(response);
            },
            (error) => {
                console.log('Error occured while saving loan request', error);
                return res.status(500).json(error.message);
            }
        );
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    }
}