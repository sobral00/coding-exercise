import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  filterForm: FormControl;
  subscriptions = new Subscription();

  constructor() {

  }

  ngOnInit(): void {
    this.initForm()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((filterValue) => {
        this.onFilterChange(filterValue);
      })
    )
  }

  onFilterChange(inputSearched: string) {

  }
}
