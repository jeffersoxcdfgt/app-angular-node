import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentProcessComponent } from './payment-process.component';
import { StoreModule } from '@ngrx/store';

describe('PaymentProcessComponent', () => {
  let component: PaymentProcessComponent;
  let fixture: ComponentFixture<PaymentProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ PaymentProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
