import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmrtdPage } from './emrtd.page';

describe('EmrtdPage', () => {
  let component: EmrtdPage;
  let fixture: ComponentFixture<EmrtdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrtdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmrtdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
