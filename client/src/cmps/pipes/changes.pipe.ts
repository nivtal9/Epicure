import { Pipe, PipeTransform } from '@angular/core';
import { Change, Changes } from '../interfaces/DishExtrasEnum';

@Pipe({
  name: 'changes'
})
export class ChangesPipe implements PipeTransform {

  transform(value: any): string {
    return Changes[value];
  }

}
