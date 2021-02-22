import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewTransferComponent } from './review-transfer/review-transfer.component';
import { TransactionService } from '../transactions-list/transaction-service/transaction-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-make-transfer',
  templateUrl: './make-transfer.component.html',
  styleUrls: ['./make-transfer.component.scss'],
})

export class MakeTransferComponent implements OnInit {
  @ViewChild('regForm', {static: false}) myForm: NgForm;
  fromAccount: string;
  toAccount: string;
  amount: number;

  accountTitle: string;
  currency: string;
  balance: number;
  overdraftLimit: number;
  preview: boolean;
  submitted: boolean;
  faCreditCard = faCreditCard;
  transferForm;

  constructor(private modalService: NgbModal, private transactionService: TransactionService) {
    this.accountTitle = 'My Personal Account';
    this.currency = '€';
    this.balance = 1000;
    this.overdraftLimit = 500;
    this.amount = 0;
    this.submitted = false;

    this.setFromAccount();
  }

  ngOnInit(): void {
    this.setForm();
  }

  // tslint:disable-next-line:typedef
  get transferFormControl() {
    return this.transferForm.controls;
  }

  // tslint:disable-next-line:typedef
  public onSubmit() {
    this.submitted = true;
    if (this.transferForm.valid){
      // send account and amount to modal
      const reviewTransferModal = this.modalService.open(ReviewTransferComponent);
      reviewTransferModal.componentInstance.data = {
        currency: this.currency,
        toAccount: this.transferForm.controls.toAccount.value,
        amount: this.transferForm.controls.amount.value
      };

      reviewTransferModal.result.then((response) => {
        if (response && response?.result === true) {
          this.balance = this.balance - response.amount;

          this.transactionService.newTransaction({
            categoryCode: '#12a580',
            dates: {
              valueDate: new Date().getTime()
            },
            transaction: {
              amountCurrency: {
                amount: this.transferForm.controls.amount.value,
                currencyCode: this.currency
              },
              type: 'Online Transfer',
              creditDebitIndicator: 'DBIT'
            },
            merchant: {
              name: this.transferForm.controls.toAccount.value,
              accountNumber: '00000000000000'
            }
          });

          this.submitted = false;
          this.transferForm.reset();
          this.myForm.resetForm();

          this.setFromAccount();
          this.setForm();
        }
      });
    }
  }

  // tslint:disable-next-line:typedef
  setFromAccount() {
    this.fromAccount = this.accountTitle + ': ' + this.currency + ' ' + this.balance.toString();
  }

  // tslint:disable-next-line:typedef
  setForm() {

    this.transferForm = new FormGroup({
      fromAccount: new FormControl({
        value: this.fromAccount,
        disabled: true
      }),
      toAccount: new FormControl({
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]),
      amount: new FormControl({
          value: null,
          disabled: false
        },
        [
          Validators.required,
          Validators.min(1),
          minBalanceValidator(this.balance, this.overdraftLimit)
        ]),
    });
  }

  validateNumber(e: any) {
    let input = String.fromCharCode(e.charCode);
    const reg = /^\d*(?:[.,]\d{1,2})?$/;

    if (!reg.test(input)) {
      e.preventDefault();
    }
  }

}

function minBalanceValidator(balance: number, overdrawnLimit: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && (isNaN(control.value) || control.value > ( balance + overdrawnLimit) )) {
      return { overdrawnLimit: true };
    }
    return null;
  };
}
