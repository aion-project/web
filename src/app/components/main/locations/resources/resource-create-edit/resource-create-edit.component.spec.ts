import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCreateEditComponent } from './resource-create-edit.component';

describe('ResourceCreateEditComponent', () => {
  let component: ResourceCreateEditComponent;
  let fixture: ComponentFixture<ResourceCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
