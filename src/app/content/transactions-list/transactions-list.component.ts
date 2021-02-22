import {Component, EventEmitter, OnInit} from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import transactionList from '../../../../bb-ui/mock-data/transactions.json';
import { TransactionService } from './transaction-service/transaction-service.service';


@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  providers: [ ]
})

export class TransactionsListComponent implements OnInit {
  faList = faList;
  transactions;
  transactionsData;

  message: string;



  constructor(private data: TransactionService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // get from api or local json
    const api = false;
    if (api) {
      this.data.getTransactions().subscribe(response => {
        /**
         * Access to XMLHttpRequest at 'https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions'
         * from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin'
         * header is present on the requested resource.
         */
        this.transactions = response;
      });
    } else {
      // tslint:disable-next-line:only-arrow-functions typedef
      transactionList.data.map(function(value, key){
        if (typeof value.dates.valueDate === 'string'){
          value.dates.valueDate = Date.parse(value.dates.valueDate);
        }
        if (typeof value.transaction.amountCurrency.amount === 'string'){
          value.transaction.amountCurrency.amount = parseFloat(value.transaction.amountCurrency.amount);
        }
      });

      this.transactionsData = transactionList.data;
      this.transactions = this.transactionsData;
    }

    this.data.currentMessage.subscribe((data) => {
      if (Object.keys(data).length !== 0 ){
        this.transactions = [...this.transactions, data];
      }
    });
  }


  // tslint:disable-next-line:typedef
  public transactionType(value){
    return value.toLowerCase() === 'crdt' ;
  }

  // tslint:disable-next-line:typedef
  public transactionTypeAmount(value, type){
    // convert to float
    const new32 = parseFloat(value);
    // convert to negative if type is credit
    const tmp = this.transactionType(type) ? new32 : -new32;
    // check if whole number, if not then add 2 decimals. ie 5000 == 5000 and not 5000.00, and 22.10 = 22.10 and not 22.1
    return !this.isInt(tmp) ? parseFloat(tmp.toString()).toFixed(2) : parseFloat(tmp.toString());
  }

  // tslint:disable-next-line:typedef
  public isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  // tslint:disable-next-line:typedef
  filterTransactions($event) {
    // tslint:disable-next-line:only-arrow-functions typedef
    this.transactions = this.transactionsData.filter( function(value) {
      return value.merchant.name.includes($event);
    });
  }

}

