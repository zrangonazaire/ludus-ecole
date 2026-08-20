import { Injectable, signal } from '@angular/core';

export type ToastTone = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  tone: ToastTone;
  message: string;
  title?: string;
  timeout: number;
}

/** In-memory toast queue. No browser storage is used. */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  success(message: string, title?: string): void {
    this.push('success', message, title, 4000);
  }

  error(message: string, title?: string): void {
    this.push('error', message, title, 7000);
  }

  warning(message: string, title?: string): void {
    this.push('warning', message, title, 5500);
  }

  info(message: string, title?: string): void {
    this.push('info', message, title, 4000);
  }

  dismiss(id: string): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private push(tone: ToastTone, message: string, title: string | undefined, timeout: number): void {
    const toast: Toast = { id: crypto.randomUUID(), tone, message, title, timeout };
    this._toasts.update((list) => [...list, toast]);
    setTimeout(() => this.dismiss(toast.id), timeout);
  }
}
