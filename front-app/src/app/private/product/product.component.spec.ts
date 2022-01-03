/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from './product.component';
import { StoreModule } from '@ngrx/store';

const testPost = {
  id: 1,
  name: 'Jefferson',
  description: 'example',
  price: 1236,
  picture: 'path',
  cost: 78945,
  quantity: 5,
  createdAt: '2022-01-01',
  updatedAt: '2022-01-01',
  idproc: 1223,
  image: 'xxxx'
};

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
