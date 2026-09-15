import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { FINANCE_DATA_SOURCE, STUDENT_DATA_SOURCE } from '@core/datasource/data-source';
import { FinancialSummary, Payment, StudentSummary } from '@core/models/domain.models';
import { NotificationService } from '@core/services/notification.service';
import { PaymentListComponent } from './payment-list.component';

describe('Payment collection', () => {
  let component: PaymentListComponent;
  let finance: jasmine.SpyObj<any>;
  let notifications: jasmine.SpyObj<NotificationService>;
  const payment = { id: 'payment-1', paymentReference: 'PAY-1', status: 'VALIDATED', allocations: [] } as unknown as Payment;
  const student = { id: 'student-1', fullName: 'Awa Koné' } as StudentSummary;
  const summary = { academicYearId: 'year-1', outstandingAmount: 10000, fees: [] } as unknown as FinancialSummary;

  beforeEach(() => {
    finance = jasmine.createSpyObj('finance', ['cancelPayment', 'getPayment', 'getStudentSummary', 'recordPayment', 'searchPayments']);
    notifications = jasmine.createSpyObj('notifications', ['success', 'error']);
    TestBed.configureTestingModule({ providers: [
      { provide: FINANCE_DATA_SOURCE, useValue: finance },
      { provide: STUDENT_DATA_SOURCE, useValue: {} },
      { provide: NotificationService, useValue: notifications },
      { provide: ActivatedRoute, useValue: {} }
    ] });
    component = TestBed.runInInjectionContext(() => new PaymentListComponent());
  });

  it('waits for server confirmation before announcing cancellation', () => {
    const result = new Subject<Payment>();
    finance.cancelPayment.and.returnValue(result);
    spyOn(component, 'load');
    component.askCancel(payment);
    component.confirmCancel('  Saisie en double  ');
    expect(finance.cancelPayment).toHaveBeenCalledWith(payment.id, 'Saisie en double');
    expect(component.cancelling()).toBeTrue();
    expect(notifications.success).not.toHaveBeenCalled();
    result.next({ ...payment, status: 'CANCELLED' });
    result.complete();
    expect(notifications.success).toHaveBeenCalled();
    expect(component.load).toHaveBeenCalled();
    expect(component.cancelling()).toBeFalse();
  });

  it('does not announce success when cancellation fails', () => {
    finance.cancelPayment.and.returnValue(throwError(() => new Error('Closed till')));
    component.askCancel(payment);
    component.confirmCancel('Saisie en double');
    expect(notifications.success).not.toHaveBeenCalled();
    expect(notifications.error).toHaveBeenCalled();
    expect(component.cancelling()).toBeFalse();
  });

  it('loads the current receipt status from the server', () => {
    finance.getPayment.and.returnValue(of({ ...payment, status: 'CANCELLED' }));
    component.showReceipt(payment);
    expect(finance.getPayment).toHaveBeenCalledWith(payment.id);
    expect(component.receipt()?.status).toBe('CANCELLED');
    expect(component.receiptLoading()).toBeFalse();
  });

  it('ignores a previous students late financial response', () => {
    const previous = new Subject<FinancialSummary>();
    finance.getStudentSummary.and.returnValues(previous, of(summary));
    component.selectStudent(student);
    component.changeStudent();
    component.selectStudent({ ...student, id: 'student-2' });
    previous.next({ ...summary, outstandingAmount: 99999 });
    expect(component.selectedStudent()?.id).toBe('student-2');
    expect(component.financialSummary()?.outstandingAmount).toBe(10000);
  });

  it('keeps the operation id when retrying a failed collection', () => {
    component.openCollection();
    component.selectedStudent.set(student);
    component.financialSummary.set(summary);
    component.chooseAmount(1000);
    finance.recordPayment.and.returnValue(throwError(() => new Error('Network')));
    component.submitPayment();
    component.submitPayment();
    const calls = finance.recordPayment.calls.allArgs();
    expect(calls.length).toBe(2);
    expect(calls[0][0].operationId).toBeTruthy();
    expect(calls[0][0].operationId).toBe(calls[1][0].operationId);
  });

  it('rejects future payment dates and already completed collections', () => {
    component.selectedStudent.set(student);
    component.financialSummary.set(summary);
    component.chooseAmount(1000);
    component.paymentForm.controls.paymentDate.setValue('2999-01-01');
    expect(component.canSubmit()).toBeFalse();
    component.paymentForm.controls.paymentDate.setValue(component.today);
    expect(component.canSubmit()).toBeTrue();
    component.paymentResult.set(payment);
    expect(component.canSubmit()).toBeFalse();
  });

  it('exports every result page and preserves the search', () => {
    spyOn(component, 'load');
    component.onSearch('Awa');
    const createUrl = spyOn(URL, 'createObjectURL').and.returnValue('blob:test');
    spyOn(URL, 'revokeObjectURL');
    spyOn(HTMLAnchorElement.prototype, 'click');
    finance.searchPayments.and.returnValues(
      of({ content: [payment], page: 0, last: false }),
      of({ content: [{ ...payment, id: 'payment-2' }], page: 1, last: true })
    );
    component.exportPayments();
    expect(finance.searchPayments.calls.allArgs()).toEqual([
      [{ page: 0, size: 100, search: 'Awa' }],
      [{ page: 1, size: 100, search: 'Awa' }]
    ]);
    expect(createUrl).toHaveBeenCalled();
    expect(notifications.success).toHaveBeenCalledWith('2 paiement(s) exporté(s).');
    expect(component.exporting()).toBeFalse();
  });

  it('does not download an incomplete export when a later page fails', () => {
    const createUrl = spyOn(URL, 'createObjectURL');
    finance.searchPayments.and.returnValues(
      of({ content: [payment], page: 0, last: false }),
      throwError(() => new Error('Network'))
    );
    component.exportPayments();
    expect(createUrl).not.toHaveBeenCalled();
    expect(notifications.error).toHaveBeenCalled();
    expect(component.exporting()).toBeFalse();
  });
});
