import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './starComponent/star.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './pipes/convert-to-spaces.pipe';



@NgModule({
  declarations: [
    StarComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    ConvertToSpacesPipe,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
