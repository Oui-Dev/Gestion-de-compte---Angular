const bankModel = {
    listBank: [
  
        {
            title: 'N°',
            columnDisplay: 'numero',
            value: 'numero'
        },
        {
            title: 'Info',
            columnDisplay: 'info',
            value: 'info'
        },
        {
            title: 'Date',
            columnDisplay: 'date',
            value: 'date'
        },
        {
            title: 'Type',
            columnDisplay: 'type',
            value: 'type'
        },
        {
            title: 'Montant',
            columnDisplay: 'montant',
            value: 'montant'
        }
    ]
}

export class ModelListBank {
    getListBank(){
        return bankModel;
    }
}