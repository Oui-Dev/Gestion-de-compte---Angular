import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-new-bank',
    templateUrl: './add-new-bank.component.html',
    styleUrls: ['./add-new-bank.component.scss']
})
export class AddNewBankComponent implements OnInit {
    registerForm!: FormGroup;
    isSubmitted = false;
    formLoading = false;

    constructor(public formBuilder: FormBuilder, private router: Router) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            nom: ['', Validators.required],
            solde: ['', Validators.required],
            // type: ['', Validators.required],
        })

        this.formLoading = true;
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit(): void {
        this.isSubmitted = true;
        let json_data = JSON.parse(localStorage.getItem('bank') || '[]');

        if (this.registerForm.invalid) {
            console.log('error', this.registerForm.invalid);
        } else {
            let newValue = {
                id: 1,
                nom: this.registerForm.controls['nom'].value,
                solde: this.registerForm.controls['solde'].value,
                // type: this.registerForm.controls['type'].value,
            };

            if(json_data.length >= 1) {
                newValue.id = Number(json_data[json_data.length-1].id)+1;
            }
            json_data.push(newValue);
            localStorage.setItem('bank', JSON.stringify(json_data));
            this.router.navigate(['/']);
        }
    }
}