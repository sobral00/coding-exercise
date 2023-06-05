import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { ViewerComponent } from './viewer.component';
import { ListComponent } from '../list/list.component';
import { Customer } from '../../models/customer';
import { Product } from '../../models/product';

@Component({
  template: `
    <app-viewer #viewer></app-viewer>
    <app-list (elementSelected)="onElementSelected($event)"></app-list>
  `
})
class TestHostComponent {
  @ViewChild('viewer') viewerComponent: ViewerComponent;

  onElementSelected(element: Customer | Product): void {
    this.viewerComponent.addDetailsComponentToView(element);
  }
}

describe('ViewerComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewerComponent, ListComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should load the selected element in the viewer', () => {
    const testHostComponent = fixture.componentInstance;
    const viewerComponent = testHostComponent.viewerComponent;
    const element: Customer = { name: 'John Doe', birthDate: new Date() };

    viewerComponent.addDetailsComponentToView(element);
    fixture.detectChanges();
    console.log(viewerComponent);
    
    const viewerElement = viewerComponent.currentComponent.instance.element;
    expect(viewerElement.name).toContain(element.name);
  });
});
