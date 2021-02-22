import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BbUIModule } from 'bb-ui/bb-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { MakeTransferComponent } from './content/make-transfer/make-transfer.component';
import { ReviewTransferComponent } from './content/make-transfer/review-transfer/review-transfer.component';
import { TransactionsListComponent } from './content/transactions-list/transactions-list.component';
import { ArraySortPipe } from './content/transactions-list/transaction-sort/transaction-sort.pipe';
import { TransactionService } from './content/transactions-list/transaction-service/transaction-service.service';
import { TransferAmountDirective } from './content/make-transfer/transfer-amount.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    MakeTransferComponent,
    TransactionsListComponent,
    ArraySortPipe,
    ReviewTransferComponent,
    TransferAmountDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BbUIModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  exports: [
    HeaderComponent,
    BbUIModule,
  ],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal, HttpClientModule, TransactionService],
  bootstrap: [AppComponent],
  entryComponents: [ ReviewTransferComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
