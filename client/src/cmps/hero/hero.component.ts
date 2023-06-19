import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  searchinput!: string;

  onKey(event: any) {
    this.searchinput = event.target.value;
  }

  cleanInput(input: HTMLInputElement) {
    input.value = '';
    this.searchinput = '';
  }
}
