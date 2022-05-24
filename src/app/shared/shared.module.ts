import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './component/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ModelListBank } from './model/model-list-bank';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    ModelListBank
  ],
  exports: [
    TableComponent
  ]
})
export class SharedModule { }
