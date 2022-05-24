import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BankComponent } from './bank.component';
import { AddNewBankComponent } from '../add-new-bank/add-new-bank.component';
import { BankRouting } from './bank-routing';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    BankComponent,
    AddNewBankComponent
  ],
  imports: [
    CommonModule,
    BankRouting,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class BankModule { }
