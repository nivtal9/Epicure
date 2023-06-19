import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DishesService } from 'src/services/dishes.service';
import { IDishes } from '../interfaces/IDishes';
import { NewOrderVerificationComponent } from '../new-order-verification/new-order-verification.component';
import { IState } from '../store/epicure/epicureReducers';


@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent {
  form: FormGroup;
  addToBag: boolean = true;
  currRestOrder$: Observable<string>;
  constructor(private dialogRef: MatDialogRef<DishModalComponent>, @Inject(MAT_DIALOG_DATA) public dish: IDishes,
    private formBuilder: FormBuilder, private dishService: DishesService, private dialog: MatDialog, private store: Store<IState>) {
    this.form = this.formBuilder.group({
      radio: new FormControl(''),
      quantity: new FormControl(1),
      checkboxes: new FormArray([])
    });
    this.currRestOrder$ = this.store.select((state) => state.shoppingBag.order.restName)
  }

  ngOnInit() {
    this.dish.dishChanges?.forEach(() => {
      (this.form.get('checkboxes') as FormArray).push(this.formBuilder.control(false))
    });

    this.form.controls['radio'].valueChanges.subscribe(val => {
      val ? this.addToBag = false : this.addToBag = true
    });
  }

  CloseDialog() {
    this.dialogRef.close()
  }

  quantityChange(bool: boolean) {
    const quantity: number = this.form.get('quantity')?.value
    if (bool) {
      if (quantity < 10)
        this.form.get('quantity')?.setValue(quantity + 1);
    }
    else {
      if (quantity > 1)
        this.form.get('quantity')?.setValue(quantity - 1);
    }
  }

  radioNotChecked() {
    return this.form.get('radio')?.value === '' ? true : false
  }

  submitDish() {
    let currRestName!: string;
    this.currRestOrder$.subscribe(res => currRestName = res).unsubscribe();
    if (currRestName === '' || currRestName === history.state.restaurant.name) {
      this.dishService.addToShoppingBag(this.form.value, this.dish)
      this.CloseDialog()
    }
    else {
      const dialogRef = this.dialog.open(NewOrderVerificationComponent, {
        width: '250px',
        height: '325px'
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.dishService.addToShoppingBag(this.form.value, this.dish, true)
          this.CloseDialog()
        }
      })
    }
  }
}
