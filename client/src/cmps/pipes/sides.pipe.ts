import { Pipe, PipeTransform } from '@angular/core';
import { Sides } from '../interfaces/DishExtrasEnum';

@Pipe({
  name: 'sides'
})
export class SidesPipe implements PipeTransform {

  transform(value: any): string {
    return Sides[value];
  }

}
