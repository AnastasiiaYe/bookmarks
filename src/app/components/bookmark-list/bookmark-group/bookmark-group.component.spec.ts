import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkGroupComponent } from './bookmark-group.component';

describe('BookmarkGroupComponent', () => {
  let component: BookmarkGroupComponent;
  let fixture: ComponentFixture<BookmarkGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
