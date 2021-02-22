import { TestBed } from '@angular/core/testing';
import { TransactionsListComponent } from './transactions-list.component';
import { ArraySortPipe } from './transaction-sort/transaction-sort.pipe';


describe('TransactionsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TransactionsListComponent,
        ArraySortPipe
      ],
    }).compileComponents();
  });

  it('should create the Transactions View', () => {
    const fixture = TestBed.createComponent(TransactionsListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
