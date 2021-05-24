import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteFilterPipe } from './complete-filter.pipe';



@NgModule({
  declarations: [
    CompleteFilterPipe
  ],
  exports:[
    CompleteFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
