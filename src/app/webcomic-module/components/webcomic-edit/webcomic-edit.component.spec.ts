import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcomicEditComponent } from './webcomic-edit.component';

describe('WebcomicEditComponent', () => {
  let component: WebcomicEditComponent;
  let fixture: ComponentFixture<WebcomicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcomicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcomicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
