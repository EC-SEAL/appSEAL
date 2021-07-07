import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageIdentityDataPage } from './manage-identity-data.page';

describe('ManageIdentityDataPage', () => {
  let component: ManageIdentityDataPage;
  let fixture: ComponentFixture<ManageIdentityDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIdentityDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageIdentityDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
