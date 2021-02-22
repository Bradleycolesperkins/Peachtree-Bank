import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  // constructor(private http: HttpClient) { }
  constructor() { }

  // tslint:disable-next-line:typedef
  getTransactions(){
    // return this.http.get('https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions');
    return null;
  }

  // tslint:disable-next-line:typedef
  newTransaction(transaction: object) {
    this.messageSource.next(transaction);
  }

}
