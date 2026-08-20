import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

/**
 * Displays a mark on the school scale.
 *
 * Presentation only: the value itself is always computed by the backend
 * (rule 14). This pipe must never do arithmetic beyond rounding for display.
 */
@Pipe({ name: 'grade', standalone: true })
export class GradePipe implements PipeTransform {
  transform(value: number | null | undefined,
            scaleMax = environment.gradingScaleMax,
            showScale = true): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '-';
    }
    const formatted = value.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return showScale ? `${formatted}/${scaleMax}` : formatted;
  }
}
