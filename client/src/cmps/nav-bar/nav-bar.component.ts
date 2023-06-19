import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  shoppingBagClicked: boolean = false;
  searchInput!: string;

  constructor(private dialog: MatDialog) { }

  onKey(event: any) {
    this.searchInput = event.target.value;
  }

  cleanInput(input: HTMLInputElement) {
    input.value = '';
    this.searchInput = '';
  }

  ShoppingBag(): void {
    this.shoppingBagClicked = !this.shoppingBagClicked;
  }
  openDialog(): void {
    this.dialog.open(LoginComponent)
  }
}
