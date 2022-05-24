import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModelListBank } from '../shared/model/model-list-bank';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'app-bank',
    templateUrl: './bank.component.html',
    styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
    dataSource: any = [];
    modelList: any = [];
    registerForm!: FormGroup;
    add_BTN: boolean = false;
    edit_BTN: boolean = true;
    del_BTN: boolean = true;

    id: string = "";
    account: string = "";
    solde: any = "";

    isSubmitted = false;
    tableLoading = false;
    formLoading = false;

    constructor(
        public modelBank: ModelListBank,
        public formBuilder: FormBuilder,
        public datepipe: DatePipe,
        private changeDetectorRefs: ChangeDetectorRef,
        private route: ActivatedRoute,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.modelList = this.modelBank.getListBank()['listBank'];

        let json_data = JSON.parse(localStorage.getItem('transacBank'+this.id) || '[]');
        this.dataSource = json_data;
        this.tableLoading = true;

        let bank_data = JSON.parse(localStorage.getItem('bank') || '[]');
        let index = bank_data.findIndex((i: any) => i.id == this.id);
        this.solde = bank_data[index].solde;
        this.account = bank_data[index].nom;

        this.registerForm = this.formBuilder.group({
            info: ['', Validators.required],
            prix: ['', Validators.required],
            date: ['', Validators.required],
            type: ['', Validators.required],
            action: ['', Validators.required],
            row: [''],
        });
        
        this.formLoading = true;
        this.registerForm.patchValue({action:'-', tc:true});
    }

    get f() {
        return this.registerForm.controls;
    }

    // Lors de l'envoi du formulaire
    onSubmit(e: any): void {
        this.isSubmitted = true;
        let json_data = JSON.parse(localStorage.getItem('transacBank'+this.id) || '[]');
        let diff = 0;

        // Si bouton supprimer
        if(e.submitter.value === "Supprimer") {
            if(confirm("Etes vous sur de vouloir supprimer cette ligne ?")) {
                let index = json_data.findIndex(((i: any) => i.numero === JSON.parse(this.registerForm.controls['row'].value || '[]').numero));
                diff = JSON.parse(this.registerForm.controls['row'].value || '[]').montant;
                if(JSON.parse(this.registerForm.controls['row'].value || '[]').action == "-") {
                    diff = -diff;
                }
                json_data.splice(index, 1);
                this.addData(json_data, diff);
                this.showSnackBar("Données supprimées");
            }
        // Si formulaire invalide
        } else if(this.registerForm.invalid){
            console.log('error', this.registerForm.invalid);
        } else {
            // Si bouton ajouter
            if(e.submitter.value === "Ajouter") {
                let newValue = {
                    numero: 1,
                    date: this.datepipe.transform(this.registerForm.controls['date'].value, 'dd-MM-yyyy'),
                    info: this.registerForm.controls['info'].value,
                    type: this.registerForm.controls['type'].value,
                    montant: this.registerForm.controls['prix'].value,
                    action: this.registerForm.controls['action'].value,
                }
                if(json_data.length >= 1) {
                    newValue.numero = Number(json_data[json_data.length-1].numero)+1;
                }

                diff = this.registerForm.controls['prix'].value;
                if(this.registerForm.controls['action'].value === "+") {
                    diff = -diff;
                }
                json_data.push(newValue);
                this.showSnackBar("Données ajoutées");
            // Si bouton modifier
            } else if(e.submitter.value === "Modifier") {
                let index = json_data.findIndex(((i: any) => i.numero === JSON.parse(this.registerForm.controls['row'].value || '[]').numero));
                let editValue = {
                    numero: JSON.parse(this.registerForm.controls['row'].value || '[]').numero,
                    date: this.datepipe.transform(this.registerForm.controls['date'].value, 'dd-MM-yyyy'),
                    info: this.registerForm.controls['info'].value,
                    type: this.registerForm.controls['type'].value,
                    montant: this.registerForm.controls['prix'].value,
                    action: this.registerForm.controls['action'].value,
                }

                diff = this.registerForm.controls['prix'].value - JSON.parse(this.registerForm.controls['row'].value || '[]').montant;
                if(JSON.parse(this.registerForm.controls['row'].value || '[]').action != this.registerForm.controls['action'].value) {
                    diff = JSON.parse(this.registerForm.controls['row'].value || '[]').montant + this.registerForm.controls['prix'].value;
                }
                if(this.registerForm.controls['action'].value === "+") {
                    diff = -diff;
                }
                json_data[index] = editValue;
            }

            this.addData(json_data, diff);
            this.showSnackBar("Données modifiées");
        }
    }

    // Réattribue les numéros et ajoute les données
    addData(array: any, diff: number) {
        for (let i = 0; i < array.length; i++) {
            array[i].numero = i+1;
        }
        localStorage.setItem('transacBank'+this.id, JSON.stringify(array));

        // Met a jour le solde du compte
        let bank_data = JSON.parse(localStorage.getItem('bank') || '[]');
        let index = bank_data.findIndex((i: any) => i.id == this.id);
        bank_data[index] = {
            id: this.id,
            nom: this.account,
            solde: this.solde = Math.round((this.solde - diff) * 100) / 100,
        }
        localStorage.setItem('bank', JSON.stringify(bank_data))

        this.refreshDisplay();
    }

    // Rafraichi l'affichage de la table
    refreshDisplay() {
        this.isSubmitted = false;
        this.formLoading = false;
        this.tableLoading = false;
        let json_data = JSON.parse(localStorage.getItem('transacBank'+this.id) || '[]');
        this.dataSource = json_data;
        this.changeDetectorRefs.detectChanges();
        this.setButtonState(null);
        this.tableLoading = true;
        this.formLoading = true;
    }

    // Modifie l'état des boutons, et les valeurs des input
    setButtonState(row: any) {
        if(row !== null) {
            this.add_BTN = true;
            this.edit_BTN = false;
            this.del_BTN = false;

            let date = row.date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
            this.registerForm.controls['date'].setValue(this.datepipe.transform(date, 'yyyy-MM-dd'));
            this.registerForm.controls['info'].setValue(row.info);
            this.registerForm.controls['type'].setValue(row.type);
            this.registerForm.controls['prix'].setValue(row.montant);
            this.registerForm.controls['row'].setValue(JSON.stringify(row));
            this.registerForm.patchValue({action: row.action, tc:true});
        } else {
            this.add_BTN = false;
            this.edit_BTN = true;
            this.del_BTN = true;

            this.registerForm.reset();
            this.registerForm.patchValue({action:'-', tc:true});
        }
    }

    showSnackBar(message: string) {
        this.snackbar.open(message, 'Ok', {
            duration: 4000
        });
    }
}