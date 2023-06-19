import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DishModalComponent } from '../dish-modal/dish-modal.component';
import { IDishes } from '../interfaces/IDishes';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent {
  @Input() dishItem!: IDishes
  @Input() fromSingleRestPage: boolean = false

  constructor(private dialog: MatDialog) { }

  OpenDialog(dishItem: IDishes) {
    this.dialog.open(DishModalComponent, {
      width: '340px',
      height: '525px',
      data: dishItem
    })
  }
}
