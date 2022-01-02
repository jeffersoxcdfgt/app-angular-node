import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAdminComponent } from './login-admin.component';
import {  StoreModule } from '@ngrx/store';

describe('LoginAdminComponent', () => {
  let component: LoginAdminComponent;
  let fixture: ComponentFixture<LoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ LoginAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
