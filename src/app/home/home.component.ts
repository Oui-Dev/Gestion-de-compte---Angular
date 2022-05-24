import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    bank: any = [];

    constructor() { }

    ngOnInit(): void {
        this.bank = JSON.parse(localStorage.getItem('bank') || '[]');
    }

    deleteBank(id: any) {
        if(confirm("Etes vous sur de vouloir supprimer ce compte ?")) {
            let index = this.bank.findIndex(((i: any) => i.id === id));
            this.bank.splice(index, 1);

            for (let i = 0; i < this.bank.length; i++) {
                this.bank[i].id = i+1;
            }
            localStorage.setItem('bank', JSON.stringify(this.bank));
        }
    }
}