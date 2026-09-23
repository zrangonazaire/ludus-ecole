#!/usr/bin/env python3
import re

filepath = r'C:\PROJET\LUDUS-ECOLE\frontend\src\app\features\payments\payment-list.component.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the 2b section (fee selection with detailed tranches)
# Find from fees-section-title to method-section-title and remove the 2b section
pattern = r'\n             <section class="form-section form-section--spaced" aria-labelledby="fees-section-title">.*?(?=             <section class="form-section form-section--spaced" aria-labelledby="method-section-title">)'
content = re.sub(pattern, '\n', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('2b section removed successfully')
