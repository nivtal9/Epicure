import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-order-verification',
  templateUrl: './new-order-verification.component.html',
  styleUrls: ['./new-order-verification.component.scss']
})
export class NewOrderVerificationComponent {
  constructor(private dialogRef: MatDialogRef<NewOrderVerificationComponent>) { }

  newOrder(confirm: boolean) {
    this.dialogRef.close(confirm)
  }
}
