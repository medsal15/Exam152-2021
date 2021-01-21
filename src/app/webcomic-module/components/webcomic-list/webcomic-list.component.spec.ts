import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcomicListComponent } from './webcomic-list.component';

describe('WebcomicListComponent', () => {
  let component: WebcomicListComponent;
  let fixture: ComponentFixture<WebcomicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcomicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcomicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
