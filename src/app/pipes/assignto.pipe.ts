import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../service/user.service';

@Pipe({
  name: 'assignto'
})
export class AssigntoPipe implements PipeTransform {

  constructor(private userService: UserService) { }

  transform(value: unknown, ...args: unknown[]): unknown {
    return this.userService.assignUser(value);
  }

}
