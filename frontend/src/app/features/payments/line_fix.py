#!/usr/bin/env python3

filepath = r'C:\PROJET\LUDUS-ECOLE\frontend\src\app\features\payments\payment-list.component.html'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with amount-section-title
amount_line_idx = None
for i, line in enumerate(lines):
    if 'amount-section-title' in line and 'aria-labelledby' in line:
        amount_line_idx = i
        break

if amount_line_idx:
    # Line before amount section is the closing of @if block or blank line
    # We need to insert rubrique section before the amount-section div
    
    rubrique_section = '''             <section class="form-section form-section--spaced" aria-labelledby="rubrique-section-title">

               <div class="section-heading">

                 <span class="section-heading__step">2</span>

                 <div>

                   <h3 id="rubrique-section-title">Quelle rubrique ?</h3>

                   <p>Sélectionnez la rubrique concernée. Les échéances seront affectées automatiquement.</p>

                 </div>

               </div>

               <label class="field">

                 <span class="field__label">Rubrique</span>

                 <select class="input" [formControl]="rubriqueControl" aria-label="Rubrique">

                   <option value="">Toutes les rubriques ({{ feesByRubrique().length }})</option>

                   @for (group of feesByRubrique(); track group.key) {

                     <option [value]="group.key">{{ group.name }} — {{ group.totalRemaining | money:summary.currency }} restant</option>

                   }

                 </select>

               </label>

               @if (rubriqueControl.value) {

                 <p class="inline-message inline-message--info">

                   <span aria-hidden="true">ℹ</span>{{ rubriqueName(rubriqueControl.value) }}

                 </p>

               }

             </section>

'''

    # Insert rubrique section before amount section
    # Find the blank line before the section tag and insert after it
    insert_pos = amount_line_idx - 1  # Insert before the section line
    
    # Find the actual blank line or start of @if block
    for i in range(amount_line_idx - 1, -1, -1):
        if lines[i].strip() == '' or 'financialSummary' in lines[i]:
            insert_pos = i + 1  # Insert after this line
            break
    
    lines.insert(insert_pos, rubrique_section)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print(f"Rubrique section inserted at line {insert_pos + 1}")
else:
    print("Could not find amount-section-title")
