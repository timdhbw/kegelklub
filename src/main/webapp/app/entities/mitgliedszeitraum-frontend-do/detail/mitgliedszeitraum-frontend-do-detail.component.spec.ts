import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { MitgliedszeitraumFrontendDoDetailComponent } from './mitgliedszeitraum-frontend-do-detail.component';

describe('MitgliedszeitraumFrontendDo Management Detail Component', () => {
  let comp: MitgliedszeitraumFrontendDoDetailComponent;
  let fixture: ComponentFixture<MitgliedszeitraumFrontendDoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitgliedszeitraumFrontendDoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./mitgliedszeitraum-frontend-do-detail.component').then(m => m.MitgliedszeitraumFrontendDoDetailComponent),
              resolve: { mitgliedszeitraum: () => of({ id: 2991 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(MitgliedszeitraumFrontendDoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MitgliedszeitraumFrontendDoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load mitgliedszeitraum on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', MitgliedszeitraumFrontendDoDetailComponent);

      // THEN
      expect(instance.mitgliedszeitraum()).toEqual(expect.objectContaining({ id: 2991 }));
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
