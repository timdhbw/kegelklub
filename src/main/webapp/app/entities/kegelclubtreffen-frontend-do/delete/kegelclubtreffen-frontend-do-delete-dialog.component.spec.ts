jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { KegelclubtreffenFrontendDoService } from '../service/kegelclubtreffen-frontend-do.service';

import { KegelclubtreffenFrontendDoDeleteDialogComponent } from './kegelclubtreffen-frontend-do-delete-dialog.component';

describe('KegelclubtreffenFrontendDo Management Delete Component', () => {
  let comp: KegelclubtreffenFrontendDoDeleteDialogComponent;
  let fixture: ComponentFixture<KegelclubtreffenFrontendDoDeleteDialogComponent>;
  let service: KegelclubtreffenFrontendDoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KegelclubtreffenFrontendDoDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(KegelclubtreffenFrontendDoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(KegelclubtreffenFrontendDoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(KegelclubtreffenFrontendDoService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
