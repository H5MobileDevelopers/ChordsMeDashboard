import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordsAddComponent } from './chords-add.component';

describe('ChordsAddComponent', () => {
  let component: ChordsAddComponent;
  let fixture: ComponentFixture<ChordsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChordsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
