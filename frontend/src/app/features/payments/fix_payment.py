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

                   <p>Sélectionnez la rubrique concernée.</p>

                 </div>

               </div>

               <label class="field">

                 <span class="field__label">Rubrique</span>

                 <select class="input" [formControl]="rubriqueControl" aria-label="Rubrique">

                   <option value="">Toutes les rubriques</option>

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

# Pattern to find the amount section start
pattern1 = r'(@if \(financialSummary\(\)\([^;]*;\s*summary\) \{\s*)(<section class="form-section form-section--spaced" aria-labelledby="amount-section-title">)'
replacement1 = r'\1' + rubrique_section

content = re.sub(pattern1, replacement1, content)

# 2. Update step number for amount section from 2 to 3
content = content.replace('<span class="section-heading__step">2</span>\n\n                 <div>\n\n                   <h3 id="amount-section-title">', 
                          '<span class="section-heading__step">3</span>\n\n                 <div>\n\n                   <h3 id="amount-section-title">')

# 3. Update description text
content = content.replace('<p>Le montant sera affecté aux échéances les plus anciennes.</p>',
                          '<p>Le montant sera affecté aux échéances dans l\'ordre.</p>')

# 4. Update method section step from 3 to 4
content = content.replace('<span class="section-heading__step">3</span>\n\n                 <div>\n\n                   <h3 id="method-section-title">',
                          '<span class="section-heading__step">4</span>\n\n                 <div>\n\n                   <h3 id="method-section-title">')

# 5. Remove the 2b section (fee selection with detailed tranches)
# Find and remove the entire section starting with 2b heading
pattern2 = r'\n             <section class="form-section form-section--spaced" aria-labelledby="fees-section-title">.*?(?=             <section class="form-section form-section--spaced" aria-labelledby="method-section-title">)'
content = re.sub(pattern2, '\n', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Payment form updated successfully')
