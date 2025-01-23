jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { KeglerFrontendDoService } from '../service/kegler-frontend-do.service';

import { KeglerFrontendDoDeleteDialogComponent } from './kegler-frontend-do-delete-dialog.component';

describe('KeglerFrontendDo Management Delete Component', () => {
  let comp: KeglerFrontendDoDeleteDialogComponent;
  let fixture: ComponentFixture<KeglerFrontendDoDeleteDialogComponent>;
  let service: KeglerFrontendDoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeglerFrontendDoDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(KeglerFrontendDoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(KeglerFrontendDoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(KeglerFrontendDoService);
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
