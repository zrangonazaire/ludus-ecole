import re

with open('C:/PROJET/LUDUS-ECOLE/frontend/src/app/features/payments/payment-list.component.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Create rubrique section
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

                 <select class="input" [formControl]="rubriqueControl">

                   <option value="">Toutes les rubriques</option>

                   @for (group of feesByRubrique(); track group.key) {

                     <option [value]="group.key">{{ group.name }} — {{ group.totalRemaining | money:summary.currency }}</option>

                   }

                 </select>

               </label>

             </section>

             '''

# Find and replace
pattern = r'(@if \(financialSummary\(\)\([^;]*;\s*summary\) \{\s*)(<section class="form-section form-section--spaced" aria-labelledby="amount-section-title">)'
replacement = r'\1' + rubrique_section + r'\2'

new_content = re.sub(pattern, replacement, content)

with open('C:/PROJET/LUDUS-ECOLE/frontend/src/app/features/payments/payment-list.component.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Done')
