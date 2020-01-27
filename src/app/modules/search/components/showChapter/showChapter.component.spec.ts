import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowChapterComponent } from './showChapter.component';

describe('TextComponent', () => {
  let component: ShowChapterComponent;
  let fixture: ComponentFixture<ShowChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
