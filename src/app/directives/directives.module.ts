import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoDigitDecimalNumberDirective } from './two-digit-decimal-number.directive';



@NgModule({
  declarations: [
    TwoDigitDecimalNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ TwoDigitDecimalNumberDirective ]
})
export class DirectivesModule { }
