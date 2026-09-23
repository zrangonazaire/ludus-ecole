#!/usr/bin/env python3
import re

filepath = r'C:\PROJET\LUDUS-ECOLE\frontend\src\app\features\payments\payment-list.component.html'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find line numbers of 2b section
start_line = None
end_line = None

for i, line in enumerate(lines):
    if 'fees-section-title' in line and 'aria-labelledby' in line:
        start_line = i - 1  # Start from the section tag
    if start_line and 'method-section-title' in line and 'aria-labelledby' in line:
        end_line = i - 1  # End right before method section
        break

if start_line and end_line:
    # Remove lines from start_line to end_line (exclusive of method section)
    new_lines = lines[:start_line] + lines[end_line:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f'Removed lines {start_line+1} to {end_line} (2b section with fees)')
else:
    print(f'Lines not found: start={start_line}, end={end_line}')
    # Print some debug info
    for i, line in enumerate(lines):
        if 'fees-section' in line or 'method-section' in line or 'amount-section' in line:
            print(f'{i+1}: {line.strip()}')
