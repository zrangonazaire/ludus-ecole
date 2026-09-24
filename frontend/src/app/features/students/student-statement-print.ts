import { StudentStatement } from '@core/services/student-statement.service';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';

/** Builds a standalone print document using text nodes for all school/user data. */
export function renderStudentStatement(doc: Document, statement: StudentStatement): void {
  const student = statement.student;
  const money = new MoneyPipe(); const status = new StatusLabelPipe();
  const date = (value?: string) => value ? value.slice(0, 10).split('-').reverse().join('/') : '—';
  doc.title = `Situation de ${student.fullName} — ${student.studentNumber}`;
  doc.documentElement.lang = 'fr';
  doc.body.replaceChildren();
  const style = doc.createElement('style');
  style.textContent = `@page{size:A4;margin:14mm}body{font:10pt Arial,sans-serif;color:#172033;max-width:190mm;margin:24px auto}h1{font-size:20pt}h2{font-size:13pt;margin-top:24px;break-after:avoid}p{white-space:pre-wrap;overflow-wrap:anywhere}table{width:100%;border-collapse:collapse;table-layout:fixed;margin:12px 0}th,td{border:1px solid #bbb;padding:7px;text-align:left;overflow-wrap:anywhere;white-space:pre-wrap}th{background:#f0f3f8}thead{display:table-header-group}tr{break-inside:avoid}.muted{color:#555}button{padding:10px;margin-bottom:12px}@media print{button{display:none}body{margin:0;max-width:none}}`;
  doc.head.append(style);
  const add = (tag: string, text: string, parent: HTMLElement = doc.body) => {
    const el = doc.createElement(tag); el.textContent = text; parent.append(el); return el;
  };
  const table = (headers: string[], rows: string[][]) => {
    const el = add('table', ''); const head = add('thead', '', el); const tr = add('tr', '', head);
    headers.forEach(h => add('th', h, tr)); const body = add('tbody', '', el);
    rows.forEach(row => { const r = add('tr', '', body); row.forEach(cell => add('td', cell, r)); });
  };
  const button = add('button', 'Imprimer / Enregistrer en PDF');
  button.addEventListener('click', () => doc.defaultView?.print());
  add('h2', statement.schoolName);
  add('p', [statement.schoolAddress, statement.schoolPhone].filter(Boolean).join(' · '));
  add('h1', 'Fiche générale et situation de l’élève');
  add('p', `Éditée le ${date(statement.generatedAt)} · Historique toutes années`);
  add('h2', 'Informations générales');
  table(['Information', 'Valeur'], [
    ['Matricule', student.studentNumber], ['Nom et prénoms', student.fullName],
    ['Sexe', ({ MALE: 'Masculin', FEMALE: 'Féminin', OTHER: 'Autre' })[student.gender] ?? '—'],
    ['Naissance', `${date(student.birthDate)} · ${student.birthPlace || '—'}`],
    ['Nationalité', student.nationality || '—'], ['Statut', status.transform(student.status)],
    ['Classe actuelle / niveau', [student.classroomName, student.levelName].filter(Boolean).join(' · ') || 'Aucune inscription active'],
    ['Admission', date(student.admissionDate)], ['Établissement précédent', student.previousSchool || '—'],
    ['Téléphone / courriel', [student.phone, student.email].filter(Boolean).join(' · ') || '—'],
    ['Adresse / ville', [student.addressLine1, student.city].filter(Boolean).join(' · ') || '—']
  ]);
  add('h2', 'Responsables légaux');
  if (student.guardians.length) table(['Nom', 'Lien / responsabilité', 'Coordonnées'], student.guardians.map(g => [
    g.fullName, [status.transform(g.relationship), g.primary ? 'Principal' : '', g.financialResponsibility ? 'Responsable financier' : ''].filter(Boolean).join(' · '),
    [g.phone, g.email].filter(Boolean).join('\n') || '—'
  ])); else add('p', 'Aucun responsable enregistré.');
  add('h2', 'Parcours scolaire');
  if (statement.enrollments.length) table(['Année', 'Classe / niveau', 'Date', 'Statut'], statement.enrollments.map(e => [
    e.academicYearCode, `${e.classroomName} · ${e.levelName}`, date(e.enrollmentDate), status.transform(e.status)
  ])); else add('p', 'Aucune inscription enregistrée.');
  add('h2', 'Situation financière par année');
  if (statement.balances.length) table(['Année', 'Frais dus', 'Réglé sur frais', 'Reste à payer'], statement.balances.map(b => [
    b.yearLabel, money.transform(b.summary.totalDue, b.summary.currency), money.transform(b.summary.totalPaid, b.summary.currency),
    money.transform(b.summary.outstandingAmount, b.summary.currency)
  ])); else add('p', 'Aucun frais enregistré.');
  add('h2', 'Historique des paiements');
  add('p', 'Les paiements en attente, annulés, contre-passés ou échoués ne sont pas comptés comme des règlements validés. Un versement non affecté reste distinct des frais réglés.');
  if (statement.payments.length) table(['Date / année', 'Référence / reçu', 'Mode / payeur', 'Montant / non affecté', 'Statut'], statement.payments.map(p => [
    `${date(p.paymentDate)}\n${p.yearLabel}`, `${p.reference}\n${p.receiptNumber || 'Sans reçu'}`,
    `${status.transform(p.method)}\n${p.payerName || '—'}`,
    `${money.transform(p.amount, p.currency)}${p.status === 'VALIDATED' && Number(p.unallocatedAmount) > 0 ? '\nNon affecté : ' + money.transform(p.unallocatedAmount, p.currency) : ''}`,
    status.transform(p.status)
  ])); else add('p', 'Aucun paiement enregistré.');
}
