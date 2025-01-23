import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { KeglerFrontendDoDetailComponent } from './kegler-frontend-do-detail.component';

describe('KeglerFrontendDo Management Detail Component', () => {
  let comp: KeglerFrontendDoDetailComponent;
  let fixture: ComponentFixture<KeglerFrontendDoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeglerFrontendDoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./kegler-frontend-do-detail.component').then(m => m.KeglerFrontendDoDetailComponent),
              resolve: { kegler: () => of({ id: 12905 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(KeglerFrontendDoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeglerFrontendDoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load kegler on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', KeglerFrontendDoDetailComponent);

      // THEN
      expect(instance.kegler()).toEqual(expect.objectContaining({ id: 12905 }));
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
