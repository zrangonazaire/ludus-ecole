import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FEE_DATA_SOURCE } from '@core/datasource/data-source';
import {
  FeeCategoryCode, FeeSchedule, FeeType, LevelFees
} from '@core/models/fee.models';
import { ApprovalCircuitService } from '@core/services/approval-circuit.service';
import { FeeApprovalService } from '@core/services/fee-approval.service';
import { NotificationService } from '@core/services/notification.service';
import { SetupStatusService } from '@core/services/setup-status.service';
import { FinanceComponent } from './finance.component';

/** Un type de frais du catalogue, tel que le serveur le renvoie. */
function feeType(id: string, category: FeeCategoryCode, label: string): FeeType {
  return {
    id, code: id.toUpperCase(), name: label, category, categoryLabel: label,
    recurrence: 'ANNUAL', recurrenceLabel: 'Chaque année',
    mandatory: true, refundable: false, status: 'ACTIVE',
    pricedLevels: 0, deletable: false
  };
}

/** Un tarif posé sur un niveau. */
function tariff(feeTypeId: string, category: FeeCategoryCode, mandatory: boolean,
                totalAmount: number): FeeSchedule {
  return {
    id: `${feeTypeId}-${totalAmount}`, feeTypeId,
    feeTypeCode: feeTypeId.toUpperCase(), feeTypeName: feeTypeId, category, mandatory,
    label: feeTypeId, totalAmount, currency: 'XOF',
    appliesToNewStudents: true, appliesToReturningStudents: true,
    status: 'ACTIVE', instalments: [], locked: false
  };
}

/** Un niveau et les tarifs qui y sont posés. */
function level(levelId: string, schedules: FeeSchedule[]): LevelFees {
  const mandatory = schedules.filter((schedule) => schedule.mandatory);
  return {
    levelId, levelName: levelId, levelCode: levelId, cycleId: 'c-1', cycleName: 'Primaire',
    sequence: 1, scheduleCount: schedules.length,
    mandatoryTotal: mandatory.reduce((sum, row) => sum + row.totalAmount, 0),
    optionalTotal: schedules.filter((schedule) => !schedule.mandatory)
      .reduce((sum, row) => sum + row.totalAmount, 0),
    instalmentCount: 0, ready: mandatory.length > 0, currency: 'XOF', schedules
  };
}

describe('Plan de facturation — état par catégorie', () => {
  let component: FinanceComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      { provide: FEE_DATA_SOURCE, useValue: { listTypes: () => of([]), levels: () => of([]) } },
      { provide: FeeApprovalService, useValue: {} },
      { provide: ApprovalCircuitService, useValue: { list: () => of([]) } },
      { provide: NotificationService, useValue: { success: () => {}, error: () => {} } },
      { provide: SetupStatusService, useValue: { refresh: () => {} } }
    ] });
    component = TestBed.runInInjectionContext(() => new FinanceComponent());
  });

  it('agrège types, niveaux et montants par rubrique', () => {
    component.types.set([
      feeType('t-scol', 'TUITION', 'Scolarité'),
      feeType('t-insc', 'REGISTRATION', 'Inscription')
    ]);
    component.levels.set([
      level('CM1', [
        tariff('t-scol', 'TUITION', true, 120000),
        tariff('t-scol', 'TUITION', true, 150000)
      ]),
      level('CM2', [tariff('t-insc', 'REGISTRATION', true, 25000)])
    ]);

    const tuition = component.categoryStats().find((row) => row.code === 'TUITION')!;
    expect(tuition.feeTypeCount).toBe(1);
    // Deux tarifs sur le même niveau : deux tarifs, un seul niveau tarifé.
    expect(tuition.scheduleCount).toBe(2);
    expect(tuition.pricedLevels).toBe(1);
    expect(tuition.minAmount).toBe(120000);
    expect(tuition.maxAmount).toBe(150000);
    expect(tuition.totalAmount).toBe(270000);

    const registration = component.categoryStats()
      .find((row) => row.code === 'REGISTRATION')!;
    expect(registration.totalAmount).toBe(25000);
    expect(tuition.share).toBeCloseTo(270000 / 295000, 5);
    expect(registration.share).toBeCloseTo(25000 / 295000, 5);
  });

  it('montre les rubriques déclarées restées sans tarif', () => {
    component.types.set([feeType('t-scol', 'TUITION', 'Scolarité')]);

    const transport = component.categoryStats().find((row) => row.code === 'TRANSPORT')!;
    expect(transport.label).toBe('Transport');
    expect(transport.feeTypeCount).toBe(0);
    expect(transport.scheduleCount).toBe(0);
    expect(transport.pricedLevels).toBe(0);
    expect(transport.minAmount).toBeNull();
    expect(transport.totalAmount).toBe(0);
    expect(component.unpricedCategoryNames()).toContain('Transport');
  });

  it('classe les rubriques par poids décroissant', () => {
    component.types.set([
      feeType('t-scol', 'TUITION', 'Scolarité'),
      feeType('t-cant', 'CANTEEN', 'Cantine')
    ]);
    component.levels.set([
      level('CM1', [
        tariff('t-scol', 'TUITION', true, 120000),
        tariff('t-cant', 'CANTEEN', false, 30000)
      ])
    ]);

    expect(component.categoryStats().map((row) => row.code))
      .toEqual(['TUITION', 'CANTEEN']);
    expect(component.categoryStats()[0].totalAmount).toBe(120000);
  });

  it('compte les tarifs facultatifs sans les confondre avec les obligatoires', () => {
    component.types.set([feeType('t-cant', 'CANTEEN', 'Cantine')]);
    component.levels.set([
      level('CM1', [
        tariff('t-cant', 'CANTEEN', true, 30000),
        tariff('t-cant', 'CANTEEN', false, 45000)
      ])
    ]);

    const canteen = component.categoryStats().find((row) => row.code === 'CANTEEN')!;
    expect(canteen.optionalCount).toBe(1);
    expect(canteen.totalAmount).toBe(75000);
  });

  it("accepte une rubrique créée par l'école, absente de la liste statique", () => {
    // Le serveur renvoie un code libre (V54) : le front ne connaît que les huit
    // rubriques d'origine, l'état doit malgré tout la compter et la nommer.
    const custom = 'LAB' as unknown as FeeCategoryCode;
    component.types.set([feeType('t-lab', custom, 'Laboratoire')]);
    component.levels.set([level('CM1', [tariff('t-lab', custom, true, 10000)])]);

    const row = component.categoryStats().find((stat) => stat.code === 'LAB')!;
    expect(row.label).toBe('Laboratoire');
    expect(row.feeTypeCount).toBe(1);
    expect(row.totalAmount).toBe(10000);
  });

  it("n'invente aucune part quand le catalogue ne porte aucun tarif", () => {
    component.types.set([]);
    component.levels.set([]);

    expect(component.categoryStats().length).toBeGreaterThan(0);
    expect(component.categoryStats().every((row) => row.share === 0)).toBeTrue();
    expect(component.categoryTotals().totalAmount).toBe(0);
  });
});
