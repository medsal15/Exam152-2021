import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcomicMiniComponent } from './webcomic-mini.component';

describe('WebcomicMiniComponent', () => {
  let component: WebcomicMiniComponent;
  let fixture: ComponentFixture<WebcomicMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebcomicMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcomicMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
