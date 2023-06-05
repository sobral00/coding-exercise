import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from '../../models/customer';
import { Product } from '../../models/product';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @Output() elementSelected = new EventEmitter<Customer | Product>();

  filterForm: FormControl;
  subscriptions = new Subscription();
  elements: (Product | Customer)[];
  filteredElements: (Product | Customer)[];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initForm(): void {
    this.filterForm = new FormControl();
    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((filterValue) => {
        this.applyFilter(filterValue);
      })
    );
  }

  loadData(): void {
    this.subscriptions.add(
      this.mockDataService.getData().subscribe((data) => {
        this.elements = data;
        this.filteredElements = data;
      })
    );
  }

  applyFilter(filterValue: string): void {
    if (!filterValue) {
      this.filteredElements = this.elements;
      return;
    }
  
    const regex = new RegExp(filterValue, 'i');
    this.filteredElements = this.elements.filter((element) => {
      if (this.isCustomer(element)) {
        return regex.test(element.name);
      }
  
      if (this.isProduct(element)) {
        const product = element as Product;
  
        if (!product.premium) {
          return regex.test(product.name) || regex.test(product.price.toString());
        }
  
        return false;
      }
  
      return false;
    });
  }
  
  isProduct(element: Product | Customer): element is Product {
    return (element as Product).productNumber !== undefined;
  }
  
  isCustomer(element: Product | Customer): element is Customer {
    return (element as Product).productNumber === undefined;
  }

  onElementClick(element: Customer | Product): void {
    this.elementSelected.emit(element);
  }
}
