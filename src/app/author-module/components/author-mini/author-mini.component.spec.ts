import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorMiniComponent } from './author-mini.component';

describe('AuthorMiniComponent', () => {
  let component: AuthorMiniComponent;
  let fixture: ComponentFixture<AuthorMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
