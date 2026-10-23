import { StudentStatement } from '@core/services/student-statement.service';
import { MoneyPipe } from '@shared/pipes/money.pipe';
import { StatusLabelPipe } from '@shared/pipes/status-label.pipe';

/** Builds the A4 student record, following the school's printed-form layout. */
export function renderStudentStatement(doc: Document, statement: StudentStatement): void {
  const student = statement.student;
  const money = new MoneyPipe();
  const status = new StatusLabelPipe();
  const date = (value?: string) => value
    ? value.slice(0, 10).split('-').reverse().join('/') : '—';
  const printedOn = date(statement.generatedAt);
  const yearLabel = statement.enrollments[0]?.academicYearCode ?? 'Années précédentes';

  doc.title = `Fiche élève — ${student.fullName} — ${student.studentNumber}`;
  doc.documentElement.lang = 'fr';
  doc.body.replaceChildren();

  const style = doc.createElement('style');
  style.textContent = `
    @page { size: A4; margin: 12mm 13mm 14mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #172b4d; font: 9.5pt Arial, Helvetica, sans-serif; }
    .sheet { width: 100%; }
    .toolbar { display: flex; justify-content: flex-end; margin: 0 0 8mm; }
    .toolbar button { padding: 9px 15px; border: 0; border-radius: 6px; color: #fff; background: #173f8f; font-weight: 700; cursor: pointer; }
    .masthead { display: grid; grid-template-columns: 42mm 1fr; gap: 8mm; align-items: center; padding-bottom: 5mm; border-bottom: 3px solid #173f8f; }
    .logo { width: 38mm; height: 27mm; object-fit: contain; object-position: left center; }
    .school { color: #52647d; font-size: 9pt; line-height: 1.45; }
    .school strong { display: block; margin-bottom: 1mm; color: #173f8f; font-size: 12pt; }
    .doc-title { margin: 0 0 2mm; color: #102b62; font-size: 19pt; letter-spacing: .04em; text-align: right; }
    .title-meta { color: #52647d; text-align: right; font-size: 8.5pt; }
    .student-banner { display: grid; grid-template-columns: 1fr auto; gap: 5mm; align-items: end; padding: 4mm 0 5mm; }
    .student-banner small { display: block; margin-bottom: 1mm; color: #64748b; font-size: 8pt; text-transform: uppercase; letter-spacing: .06em; }
    .student-name { color: #142d5c; font-size: 15pt; font-weight: 700; }
    .student-number { padding: 2mm 3mm; border: 1px solid #173f8f; border-radius: 5px; color: #173f8f; font-size: 9pt; font-weight: 700; }
    .section { margin: 0 0 4mm; border: 1.2px solid #244c9d; border-radius: 5px; break-inside: avoid; }
    .section--flow { break-inside: auto; }
    .section-title { display: table; position: relative; margin: -1px 0 0 3mm; padding: 1.4mm 2.5mm; border: 1px solid #244c9d; border-radius: 0 0 4px 4px; color: #173f8f; background: #fff; font-size: 10pt; font-weight: 700; }
    .section-body { padding: 3mm; }
    .fields { display: grid; grid-template-columns: 1fr 1fr; column-gap: 8mm; row-gap: 2mm; }
    .field { display: grid; grid-template-columns: minmax(31mm, 42%) 1fr; gap: 2mm; align-items: baseline; min-width: 0; }
    .field dt { color: #52647d; font-size: 8pt; }
    .field dd { min-width: 0; margin: 0; padding: 1.4mm 2mm; overflow-wrap: anywhere; background: #f0f3f8; font-weight: 600; }
    .split { display: grid; grid-template-columns: 1.1fr .9fr; gap: 4mm; align-items: stretch; }
    .split .section { margin-bottom: 4mm; }
    .guardian-list { display: grid; gap: 2mm; }
    .guardian { padding: 2mm; border: 1px solid #dbe3ef; border-radius: 4px; break-inside: avoid; }
    .guardian-name { margin-bottom: 1mm; color: #173f8f; font-weight: 700; }
    .guardian-meta { color: #52647d; font-size: 8pt; line-height: 1.45; }
    .totals { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; }
    .total { padding: 3mm; border-radius: 4px; background: #f0f3f8; }
    .total span { display: block; color: #52647d; font-size: 7.5pt; }
    .total strong { display: block; margin-top: 1mm; color: #173f8f; font-size: 10pt; }
    table { width: 100%; margin: 0; border-collapse: collapse; table-layout: fixed; }
    th, td { padding: 2mm; border: 1px solid #cbd5e1; overflow-wrap: anywhere; text-align: left; vertical-align: top; }
    th { color: #173f8f; background: #eef3fb; font-size: 7.5pt; }
    td { font-size: 8pt; }
    thead { display: table-header-group; }
    tr { break-inside: avoid; }
    .empty { margin: 0; color: #64748b; font-style: italic; }
    .amount { text-align: right; white-space: nowrap; }
    .signature { display: flex; justify-content: flex-end; margin-top: 7mm; color: #52647d; font-size: 8.5pt; }
    .footnote { margin-top: 2mm; color: #64748b; font-size: 7pt; }
    @media screen { body { max-width: 184mm; margin: 12mm auto; } }
    @media print { .toolbar { display: none; } .section { break-inside: avoid; } }
  `;
  doc.head.append(style);

  const add = (tag: string, text: string, parent: HTMLElement): HTMLElement => {
    const element = doc.createElement(tag);
    element.textContent = text;
    parent.append(element);
    return element;
  };
  const section = (title: string, parent: HTMLElement): HTMLElement => {
    const panel = doc.createElement('section');
    panel.className = 'section';
    add('h2', title, panel).className = 'section-title';
    const content = doc.createElement('div');
    content.className = 'section-body';
    panel.append(content);
    parent.append(panel);
    return content;
  };
  const fields = (parent: HTMLElement, rows: Array<[string, string]>) => {
    const grid = doc.createElement('dl');
    grid.className = 'fields';
    for (const [label, value] of rows) {
      const item = doc.createElement('div');
      item.className = 'field';
      add('dt', label, item);
      add('dd', value || '—', item);
      grid.append(item);
    }
    parent.append(grid);
  };
  const table = (parent: HTMLElement, headers: string[], rows: string[][], right: number[] = []) => {
    const element = doc.createElement('table');
    const head = doc.createElement('thead');
    const headerRow = doc.createElement('tr');
    headers.forEach((label, index) => {
      const cell = add('th', label, headerRow);
      if (right.includes(index)) cell.className = 'amount';
    });
    head.append(headerRow);
    const body = doc.createElement('tbody');
    rows.forEach((row) => {
      const rowElement = doc.createElement('tr');
      row.forEach((value, index) => {
        const cell = add('td', value || '—', rowElement);
        if (right.includes(index)) cell.className = 'amount';
      });
      body.append(rowElement);
    });
    element.append(head, body);
    parent.append(element);
    return element;
  };

  const sheet = doc.createElement('main');
  sheet.className = 'sheet';
  const toolbar = add('div', '', sheet);
  toolbar.className = 'toolbar';
  const printButton = add('button', 'Imprimer / Enregistrer en PDF', toolbar) as HTMLButtonElement;
  printButton.type = 'button';
  printButton.addEventListener('click', () => doc.defaultView?.print());

  const masthead = doc.createElement('header');
  masthead.className = 'masthead';
  const logo = doc.createElement('img');
  logo.className = 'logo';
  logo.alt = 'Logo de Ludus École';
  logo.src = new URL('/assets/branding/ludus-logo.png', window.location.origin).href;
  masthead.append(logo);
  const mastMeta = doc.createElement('div');
  const school = add('div', '', mastMeta);
  school.className = 'school';
  add('strong', statement.schoolName || 'Établissement scolaire', school);
  add('span', [statement.schoolAddress, statement.schoolPhone].filter(Boolean).join(' · '), school);
  add('h1', 'FICHE ÉLÈVE', mastMeta).className = 'doc-title';
  add('div', `Année scolaire : ${yearLabel} · Éditée le ${printedOn}`, mastMeta).className = 'title-meta';
  masthead.append(mastMeta);
  sheet.append(masthead);

  const identity = doc.createElement('div');
  identity.className = 'student-banner';
  const identityName = add('div', '', identity);
  add('small', 'Nom et prénoms', identityName);
  add('div', student.fullName, identityName).className = 'student-name';
  add('div', `Matricule · ${student.studentNumber}`, identity).className = 'student-number';
  sheet.append(identity);

  fields(section('Renseignements de l’élève', sheet), [
    ['Sexe', ({ MALE: 'Masculin', FEMALE: 'Féminin', OTHER: 'Autre' })[student.gender] ?? '—'],
    ['Date de naissance', date(student.birthDate)],
    ['Lieu de naissance', student.birthPlace || '—'],
    ['Nationalité', student.nationality || '—'],
    ['Statut', status.transform(student.status)],
    ['Classe actuelle', student.classroomName || 'Aucune inscription active'],
    ['Niveau', student.levelName || '—'],
    ['Date d’admission', date(student.admissionDate)],
    ['Établissement précédent', student.previousSchool || '—'],
    ['Téléphone', student.phone || '—'],
    ['Courriel', student.email || '—'],
    ['Adresse', [student.addressLine1, student.city].filter(Boolean).join(', ') || '—']
  ]);

  const split = doc.createElement('div');
  split.className = 'split';
  const guardianBody = section('Responsables légaux', split);
  if (student.guardians.length) {
    const list = doc.createElement('div');
    list.className = 'guardian-list';
    student.guardians.forEach((guardian) => {
      const card = doc.createElement('article');
      card.className = 'guardian';
      add('div', guardian.fullName, card).className = 'guardian-name';
      const flags = [
        status.transform(guardian.relationship),
        guardian.primary ? 'Contact principal' : '',
        guardian.financialResponsibility ? 'Responsable financier' : ''
      ].filter(Boolean).join(' · ');
      add('div', flags, card).className = 'guardian-meta';
      add('div', [guardian.phone, guardian.email].filter(Boolean).join(' · ') || 'Coordonnées non renseignées', card).className = 'guardian-meta';
      list.append(card);
    });
    guardianBody.append(list);
  } else {
    add('p', 'Aucun responsable légal enregistré.', guardianBody).className = 'empty';
  }

  const enrollmentBody = section('Parcours scolaire', split);
  enrollmentBody.parentElement?.classList.add('section--flow');
  if (statement.enrollments.length) {
    table(enrollmentBody, ['Année', 'Classe · niveau', 'Admission', 'Statut'],
      statement.enrollments.map((enrollment) => [
        enrollment.academicYearCode,
        `${enrollment.classroomName} · ${enrollment.levelName}`,
        date(enrollment.enrollmentDate), status.transform(enrollment.status)
      ]));
  } else {
    add('p', 'Aucune inscription enregistrée.', enrollmentBody).className = 'empty';
  }
  sheet.append(split);

  const financeBody = section('Informations comptables', sheet);
  if (statement.balances.length) {
    table(financeBody, ['Année scolaire', 'Montant dû', 'Total payé', 'Solde à payer'],
      statement.balances.map((balance) => [
        balance.yearLabel,
        money.transform(balance.summary.totalDue, balance.summary.currency),
        money.transform(balance.summary.totalPaid, balance.summary.currency),
        money.transform(balance.summary.outstandingAmount, balance.summary.currency)
      ]), [1, 2, 3]);
  } else {
    add('p', 'Aucun frais de scolarité enregistré.', financeBody).className = 'empty';
  }

  const paymentsBody = section('Historique des paiements', sheet);
  paymentsBody.parentElement?.classList.add('section--flow');
  if (statement.payments.length) {
    table(paymentsBody,
      ['Date · année', 'Référence · reçu', 'Mode · payeur', 'Montant', 'Affecté aux frais', 'Statut'],
      statement.payments.map((payment) => [
        `${date(payment.paymentDate)} · ${payment.yearLabel}`,
        `${payment.reference}\n${payment.receiptNumber || 'Sans reçu'}`,
        `${status.transform(payment.method)}\n${payment.payerName || '—'}`,
        money.transform(payment.amount, payment.currency),
        `${money.transform(payment.allocatedAmount, payment.currency)}${Number(payment.unallocatedAmount) > 0 ? `\nNon affecté : ${money.transform(payment.unallocatedAmount, payment.currency)}` : ''}`,
        status.transform(payment.status)
      ]), [3, 4]);
    add('p', 'Seuls les paiements validés sont comptabilisés dans les montants réglés. Les versements non affectés restent distingués.', paymentsBody).className = 'footnote';
  } else {
    add('p', 'Aucun paiement enregistré.', paymentsBody).className = 'empty';
  }

  add('div', `Fait à ${student.city || statement.schoolAddress || '________________'}, le ${printedOn}`, sheet).className = 'signature';
  doc.body.append(sheet);
}
