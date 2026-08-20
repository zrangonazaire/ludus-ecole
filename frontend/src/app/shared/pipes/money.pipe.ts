import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

/**
 * Formats an amount in the school currency.
 * XOF has no minor unit, so no decimals are shown for francs CFA.
 */
@Pipe({ name: 'money', standalone: true })
export class MoneyPipe implements PipeTransform {
  transform(value: number | null | undefined, currency = environment.currency,
            compact = false): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '-';
    }
    const noMinorUnit = currency === 'XOF' || currency === 'XAF';

    if (compact && Math.abs(value) >= 1_000_000) {
      return `${(value / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M ${currency}`;
    }

    const formatted = value.toLocaleString('fr-FR', {
      minimumFractionDigits: noMinorUnit ? 0 : 2,
      maximumFractionDigits: noMinorUnit ? 0 : 2
    });
    return `${formatted} ${currency}`;
  }
}
