import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomshipsComponent } from './randomships.component';

describe('RandomshipsComponent', () => {
  let component: RandomshipsComponent;
  let fixture: ComponentFixture<RandomshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
