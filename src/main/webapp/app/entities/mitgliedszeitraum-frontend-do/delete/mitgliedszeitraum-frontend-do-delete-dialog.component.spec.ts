jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MitgliedszeitraumFrontendDoService } from '../service/mitgliedszeitraum-frontend-do.service';

import { MitgliedszeitraumFrontendDoDeleteDialogComponent } from './mitgliedszeitraum-frontend-do-delete-dialog.component';

describe('MitgliedszeitraumFrontendDo Management Delete Component', () => {
  let comp: MitgliedszeitraumFrontendDoDeleteDialogComponent;
  let fixture: ComponentFixture<MitgliedszeitraumFrontendDoDeleteDialogComponent>;
  let service: MitgliedszeitraumFrontendDoService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MitgliedszeitraumFrontendDoDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(MitgliedszeitraumFrontendDoDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MitgliedszeitraumFrontendDoDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(MitgliedszeitraumFrontendDoService);
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
