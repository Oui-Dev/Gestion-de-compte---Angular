import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewBankComponent } from '../add-new-bank/add-new-bank.component';
import { BankComponent } from './bank.component';

const routes: Routes = [
    {
        path: 'new',
        component: AddNewBankComponent
    },
    {
        path: ':id',
        component: BankComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BankRouting {
}
