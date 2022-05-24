import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() data = [];
    @Input() tableColumn = [];
    @Output() public userSelection: EventEmitter<any> = new EventEmitter<any>();

    // dataSource: any = [];
    dataSource = new MatTableDataSource<any>([]);
    private paginator!: MatPaginator;
    displayedColumns: any = [];
    selectedRow: boolean = false;

    // @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
        this.paginator = mp;
        this.dataSource.paginator = this.paginator;
    }

    constructor() { }

    ngOnInit(): void {
        this.dataSource.data = this.data;
        this.displayedColumns = this.tableColumn.map(element => element['columnDisplay']);
    }

    selectRow(row: any) {
        this.selectedRow = row;
        this.userSelection.emit(row);
    }
}