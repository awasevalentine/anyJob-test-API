import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"loan_requests"})
export class Loan {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: "accommodation_status"})
  accomodationStatus: string;

  @Column({name: "monthly_earning"})
  monthlyEarning: string;

  @CreateDateColumn({name: "date_Created"})
  date_Created: Date;
  
  @Column({name: "loan_amount"})
  loanAmount: number;

  @Column({name: "payment_plan"})
  paymentPlan: string;

  @Column({name: "loan_approved"})
  isLoanApproved: boolean;

  @Column({name: "ip_address"})
  requestIp: string;
}