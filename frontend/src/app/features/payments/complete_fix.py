#!/usr/bin/env python3
import re

filepath = r'C:\PROJET\LUDUS-ECOLE\frontend\src\app\features\payments\payment-list.component.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find position of amount-section-title section
amount_section_pattern = r'(@if\s*\(financialSummary\(\)\s*\([^;]*;\s*summary\)\s*\{\s*)(<section class="form-section form-section--spaced" aria-labelledby="amount-section-title">)'
match = re.search(amount_section_pattern, content)

if match:
    start, end = match.span()
    print(f"Found amount section at position {start}-{end}")
    
    # Create rubrique section to insert
    rubrique_section = '''
             <section class="form-section form-section--spaced" aria-labelledby="rubrique-section-title">

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
    new_content = content[:end] + rubrique_section + content[end:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Rubrique section inserted successfully")
else:
    print("Could not find amount section")
