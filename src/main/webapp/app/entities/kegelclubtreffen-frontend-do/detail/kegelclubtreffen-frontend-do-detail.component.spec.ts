import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { KegelclubtreffenFrontendDoDetailComponent } from './kegelclubtreffen-frontend-do-detail.component';

describe('KegelclubtreffenFrontendDo Management Detail Component', () => {
  let comp: KegelclubtreffenFrontendDoDetailComponent;
  let fixture: ComponentFixture<KegelclubtreffenFrontendDoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KegelclubtreffenFrontendDoDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./kegelclubtreffen-frontend-do-detail.component').then(m => m.KegelclubtreffenFrontendDoDetailComponent),
              resolve: { kegelclubtreffen: () => of({ id: 21216 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(KegelclubtreffenFrontendDoDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KegelclubtreffenFrontendDoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load kegelclubtreffen on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', KegelclubtreffenFrontendDoDetailComponent);

      // THEN
      expect(instance.kegelclubtreffen()).toEqual(expect.objectContaining({ id: 21216 }));
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
