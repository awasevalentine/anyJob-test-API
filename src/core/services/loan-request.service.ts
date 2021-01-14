import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoanRequestDTO } from "../models/DTOs/loan-request.model";
import { Loan } from '../models/entities/loan.entity';

@Injectable()
export class LoanRequestService {
    constructor(@InjectRepository(Loan) private _loanRequestRepository: Repository<Loan>){}


    async findLoanRequestByIp(ip: string): Promise<Loan> {
        return this._loanRequestRepository.findOne({where: {requestIp: ip}});
    }

    async getLoanRequests(): Promise<Loan[]> {
        return this._loanRequestRepository.find();
    }

    async createLoanRequest(request: LoanRequestDTO): Promise<Loan> {
        let loanRequest: Loan = this.buildLoanRequestObjectFromModel(request);
        if(!request || !loanRequest)
            throw new Error("Invalid loan request. Check that all required properties are correct");
        const existingRequestWithIp = await this.findLoanRequestByIp(loanRequest.requestIp);
        if(existingRequestWithIp && !existingRequestWithIp.isLoanApproved) 
            throw new Error(`Duplicate request error. A similiar request with Ip address ${loanRequest.requestIp} already exist and yet to be approved`);
        return this._loanRequestRepository.save(loanRequest);
    }


    private buildLoanRequestObjectFromModel(request: LoanRequestDTO): Loan {
        const lRequest = new Loan();
        lRequest.accomodationStatus = request.accomodationStatus;
        lRequest.date_Created = new Date();
        lRequest.isLoanApproved = false;
        lRequest.requestIp = request.requestIp;
        lRequest.loanAmount = request.loanAmount;
        lRequest.monthlyEarning = request.monthlyEarning;
        lRequest.paymentPlan = request.paymentPlan;

        return lRequest;
    }


}