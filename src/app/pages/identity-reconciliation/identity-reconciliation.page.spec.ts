import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentityReconciliationPage } from './identity-reconciliation.page';

describe('IdentityReconciliationPage', () => {
  let component: IdentityReconciliationPage;
  let fixture: ComponentFixture<IdentityReconciliationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityReconciliationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityReconciliationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
