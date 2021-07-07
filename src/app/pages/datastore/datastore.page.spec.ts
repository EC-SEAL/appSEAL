import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatastorePage } from './datastore.page';

describe('DatastorePage', () => {
  let component: DatastorePage;
  let fixture: ComponentFixture<DatastorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatastorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatastorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
