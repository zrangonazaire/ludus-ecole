#!/usr/bin/env python3
import re

filepath = r'C:\PROJET\LUDUS-ECOLE\frontend\src\app\features\payments\payment-list.component.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add rubrique section before amount section
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

             <section class="form-section form-section--spaced" aria-labelledby="amount-section-title">
'''

# Find the exact pattern for amount section (after the 2b section was removed)
pattern1 = r'(\s*@if \(financialSummary\(\)\([^;]*;\s*summary\) \{\s*)(<section class="form-section form-section--spaced" aria-labelledby="amount-section-title">)'
replacement1 = r'\1' + rubrique_section + r'\2'
content = re.sub(pattern1, replacement1, content)

# 2. Update step number for amount section from 2 to 3
# Look for the amount section heading and update step
content = re.sub(
    r'(<section class="form-section form-section--spaced" aria-labelledby="amount-section-title">\s*<div class="section-heading">\s*)<span class="section-heading__step">2</span>',
    r'\1<span class="section-heading__step">3</span>',
    content
)

# 3. Update description text for amount section
content = content.replace(
    '<p>Le montant sera affecté aux échéances les plus anciennes.</p>',
    '<p>Le montant sera affecté aux échéances dans l\'ordre.</p>'
)

# 4. Update method section step from 3 to 4
content = re.sub(
    r'(<section class="form-section form-section--spaced" aria-labelledby="method-section-title">\s*<div class="section-heading">\s*)<span class="section-heading__step">3</span>',
    r'\1<span class="section-heading__step">4</span>',
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('All fixes applied successfully')
print('1. Rubrique section added before amount')
print('2. Amount step updated to 3')
print('3. Method step updated to 4')
