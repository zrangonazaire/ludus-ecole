import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'eduops.step-guidance.v1';

/**
 * Remembers which configuration coachmarks were acknowledged on this device.
 * No school or account data is stored here: only opaque flow/step identifiers.
 */
@Injectable({ providedIn: 'root' })
export class StepGuidanceService {
  private readonly seenKeys = signal<ReadonlySet<string>>(this.restore());

  isSeen(flow: string, step: string): boolean {
    return this.seenKeys().has(this.key(flow, step));
  }

  markSeen(flow: string, step: string): void {
    const next = new Set(this.seenKeys());
    next.add(this.key(flow, step));
    this.seenKeys.set(next);
    this.persist(next);
  }

  private key(flow: string, step: string): string {
    return `${flow}:${step}`;
  }

  private restore(): ReadonlySet<string> {
    if (typeof localStorage === 'undefined') {
      return new Set<string>();
    }
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown;
      return new Set(Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []);
    } catch {
      return new Set<string>();
    }
  }

  private persist(values: ReadonlySet<string>): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...values]));
    } catch {
      // The guide remains usable in memory when browser storage is unavailable.
    }
  }
}
