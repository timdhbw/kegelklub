import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { WurfErgebnisFrontendDoDetailComponent } from './wurf-ergebnis-frontend-do-detail.component';

describe('WurfErgebnisFrontendDo Management Detail Component', () => {
  let comp: WurfErgebnisFrontendDoDetailComponent;
  let fixture: ComponentFixture<WurfErgebnisFrontendDoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WurfErgebnisFrontendDoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./wurf-ergebnis-frontend-do-detail.component').then(m => m.WurfErgebnisFrontendDoDetailComponent),
              resolve: { wurfErgebnis: () => of({ id: 2964 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(WurfErgebnisFrontendDoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WurfErgebnisFrontendDoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load wurfErgebnis on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', WurfErgebnisFrontendDoDetailComponent);

      // THEN
      expect(instance.wurfErgebnis()).toEqual(expect.objectContaining({ id: 2964 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
