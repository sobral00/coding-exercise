import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { MockDataService } from 'src/app/services/mock-data.service';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockDataService: MockDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [MockDataService],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    mockDataService = TestBed.inject(MockDataService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the list with elements from the mock data service', () => {
    const mockData = [
      { name: 'Product 1', productNumber: '123', price: 10, premium: false },
      { name: 'Customer 1', birthDate: new Date() },
      { name: 'Product 2', productNumber: '456', price: 20, premium: true }
    ];
    spyOn(mockDataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();
    fixture.detectChanges();

    const listElements = component.elements;
    fixture.detectChanges();

    expect(listElements.length).toBe(3);
    expect(listElements[0].name).toContain('Product 1');
    expect(listElements[1].name).toContain('Customer 1');
    expect(listElements[2].name).toContain('Product 2');
  });

  it('should initialize with the original elements', () => {
    const elements = [
      { name: 'Product 1', productNumber: '123', price: 10, premium: false },
      { name: 'Customer 1', birthDate: new Date() }
    ];
    component.elements = elements;
    fixture.detectChanges();

    const listElements = component.elements;
    fixture.detectChanges();
    expect(listElements.length).toBe(2);
  });

  it('should display all elements when filter is empty', () => {
    const elements = [
      { name: 'Product 1', productNumber: '123', price: 10, premium: false },
      { name: 'Customer 1', birthDate: new Date() }
    ];
    component.elements = elements;
    fixture.detectChanges();

    component.applyFilter('');
    fixture.detectChanges();

    const listElements = component.elements;
    expect(listElements.length).toBe(2);
  });

  it('should filter elements by name', () => {
    const elements = [
      { name: 'Product 1', productNumber: '123', price: 10, premium: false },
      { name: 'Customer 1', birthDate: new Date() }
    ];
    component.elements = elements;
    fixture.detectChanges();

    component.applyFilter('Product');
    fixture.detectChanges();

    const listElements = component.filteredElements;

    expect(listElements.length).toBe(1);
    expect(listElements[0].name).toContain('Product 1');
  });

  it('should filter elements by price', () => {
    const elements = [
      { name: 'Product 1', productNumber: '123', price: 10, premium: false },
      { name: 'Product 2', productNumber: '456', price: 20, premium: false },
      { name: 'Customer 1', birthDate: new Date() }
    ];
    component.elements = elements;
    fixture.detectChanges();

    component.applyFilter('20');
    fixture.detectChanges();

    const listElements = component.filteredElements;
    expect(listElements.length).toBe(1);
    expect(listElements[0].name).toContain('Product 2');
  });

  it('should not filter premium products', () => {
    const elements = [
      { name: 'Product 1', productNumber: '123', price: 10, premium: true },
      { name: 'Product 2', productNumber: '456', price: 10, premium: false },
      { name: 'Customer 1', birthDate: new Date() }
    ];
    component.elements = elements;
    fixture.detectChanges();

    component.applyFilter('1');
    fixture.detectChanges();

    const listElements = component.filteredElements;

    expect(listElements.length).toBe(2);
    expect(listElements[0].name).toContain('Product 2');
    expect(listElements[1].name).toContain('Customer 1');
  });
});
