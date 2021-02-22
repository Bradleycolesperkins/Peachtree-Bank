import {ComponentFixture, TestBed} from '@angular/core/testing';
import { ReviewTransferComponent } from './review-transfer.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ReviewTransferComponent', () => {
  let testHostComponent: ReviewTransferComponent;
  let testHostFixture: ComponentFixture<ReviewTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ReviewTransferComponent
      ],
      providers: [
        NgbActiveModal
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(ReviewTransferComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostComponent.data = {
      toAccount: 'New Account',
      currency: '$',
      amount: 500,
    };
    testHostFixture.detectChanges();
  });

  it('should create the review transfer view', () => {
    expect(testHostFixture).toBeTruthy();
  });

  it('should close modal', () => {
    testHostComponent.closeModal();
    expect(testHostComponent.data.result).toEqual(false);
  });


  it('should send transfer', () => {
    testHostComponent.sendTransfer();
    expect(testHostComponent.data.result).toEqual(true);
  });

});
