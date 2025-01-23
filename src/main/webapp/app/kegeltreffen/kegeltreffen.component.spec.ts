import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KegeltreffenComponent } from './kegeltreffen.component';

describe('KegeltreffenComponent', () => {
  let component: KegeltreffenComponent;
  let fixture: ComponentFixture<KegeltreffenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KegeltreffenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KegeltreffenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
