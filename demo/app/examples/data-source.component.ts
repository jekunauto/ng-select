import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Person } from '../shared/data.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'select-search',
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <p>
            Most common case is showing data from backend
            API and with ng-select this is extremely simple since you can bind directly to 
            observable when using angular <b> | async</b> pipe
        </p>
        ---js
        people$: Observable<Person[]>;
        ngOnInit() {
            this.people$ = this.dataService.getPeople();
        }
        ---
        ---html,true
        <ng-select [items]="people$ | async"
                   bindLabel="name"
                   bindValue="id"
                   [(ngModel)]="selectedPersonId">
        </ng-select>
        ---
        <br />Selected: {{selectedPersonId}}

        <hr />
        <p>
            You can also set array of objects as items input
        </p>
        ---js
        people: Person[] = [];
        ngOnInit() {
            this.dataService.getPeople().subscribe(people => {
                this.people = people
            });
        }
        ---
        ---html,true
        <ng-select [items]="people"
                   bindLabel="name"
                   bindValue="id"
                   [(ngModel)]="selectedPersonId2">
        </ng-select>
        ---
        <br />Selected: {{selectedPersonId2}}

        <hr />
        <p>
            While array of objects is the most common items source, you may want to set simple array of strings, numbers, booleans
        </p>
        ---js
        items = [true, 'Two', 3];
        ---
        ---html,true
        <ng-select [items]="simpleItems"
                   [(ngModel)]="selectedSimpleItem">
        </ng-select>
        ---
        <br />Selected: {{selectedSimpleItem | json}}

        <hr />
        <p>
            If you have simple use case, you can omit items array and bind options directly in html using <b>ng-option</b> component.
        </p>
        <button type="button" class="btn btn-secondary btn-sm" (click)="disable = !disable">Toggle disabled</button>
        <hr/>
        ---html,true
        <ng-select [searchable]="false" [(ngModel)]="staticValue">
            <ng-option value="Volvo">Volvo</ng-option>
            <ng-option [disabled]="disable" value="Saab">Saab</ng-option>
            <ng-option value="Opel">Opel</ng-option>
            <ng-option value="Audi">Audi</ng-option>
        </ng-select>
        ---
        <br />Selected: {{staticValue | json}}
    `
})
export class DataSourceComponent {
    people$: Observable<Person[]>;
    people: Person[] = [];
    selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';
    selectedPersonId2 = '5a15b13c36e7a7f00cf0d7cb';

    selectedSimpleItem = 'Two';
    simpleItems = [];
    disable = true;

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.people$ = this.dataService.getPeople();
        this.dataService.getPeople().subscribe(items => this.people = items);
        this.simpleItems = [true, 'Two', 3];
    }
}


