import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MakeTransferComponent } from './make-transfer.component';
import { ReviewTransferComponent } from "./review-transfer/review-transfer.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let reviewComponent: ReviewTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ MakeTransferComponent ], // declare the test component
      providers: [ NgbActiveModal ]
    }).compileComponents();  // compile template and css

    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    reviewComponent = TestBed.createComponent(ReviewTransferComponent).componentInstance;
    fixture.detectChanges();
  }));

  it('should create the make transfer view', () => {
    expect(fixture).toBeTruthy();
  });

  it('should zero amount field', () => {
    component.transferForm.controls.toAccount.setValue('Starbucks');
    component.transferForm.controls.amount.setValue(0);
    component.onSubmit();
    // check submitted
    expect(component.submitted).toEqual(true);
    // check form invalid
    expect(component.transferForm.valid).toEqual(false);
  });

  it('should minus amount field', () => {
    component.transferForm.controls.toAccount.setValue('Starbucks');
    component.transferForm.controls.amount.setValue(-5);
    component.onSubmit();
    // check submitted
    expect(component.submitted).toEqual(true);
    // check form invalid
    expect(component.transferForm.valid).toEqual(false);
  });


  it('should mandatory amount field', () => {
    component.transferForm.controls.toAccount.setValue('Starbucks');
    component.transferForm.controls.amount.setValue('');
    component.onSubmit();
    // check submitted
    expect(component.submitted).toEqual(true);
    // check form invalid
    expect(component.transferForm.valid).toEqual(false);
  });

  it('should mandatory toAccount field', () => {
    component.transferForm.controls.toAccount.setValue('');
    component.transferForm.controls.amount.setValue(500);
    component.onSubmit();
    // check submitted
    expect(component.submitted).toEqual(true);
    // check form invalid
    expect(component.transferForm.valid).toEqual(false);
  });

  it('should decimal amount field', () => {
    component.transferForm.controls.toAccount.setValue('Starbucks');
    component.transferForm.controls.amount.setValue(12.99);

    component.onSubmit();
    // check submitted
    expect(component.submitted).toEqual(true);
    // check form invalid
    expect(component.transferForm.valid).toEqual(true);
  });

});
