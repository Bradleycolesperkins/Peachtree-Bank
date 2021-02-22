import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-transfer',
  templateUrl: './review-transfer.component.html',
  styleUrls: ['./review-transfer.component.scss'],
})

export class ReviewTransferComponent implements OnInit {
  @Input() public data;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  closeModal() {
    this.data.result = false;
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }
  // tslint:disable-next-line:typedef
  sendTransfer() {
    this.data.result = true;
    this.passEntry.emit(this.data);
    this.activeModal.close(this.data);
  }
}
