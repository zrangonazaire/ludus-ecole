import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Photo, or coloured initials derived deterministically from the name. */
@Component({
  selector: 'eduops-avatar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (photoUrl) {
      <img class="avatar" [class]="'avatar--' + size" [src]="photoUrl"
           [alt]="'Photo de ' + name" loading="lazy" />
    } @else {
      <span class="avatar avatar--initials" [class]="'avatar--' + size"
            [style.background]="background()" [attr.aria-label]="name" role="img">
        {{ initials() }}
      </span>
    }
  `,
  styles: [`
    .avatar {
      display: inline-grid;
      place-items: center;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
      font-family: var(--font-display);
      font-weight: 700;
      color: #fff;
      letter-spacing: 0;
    }
    .avatar--sm { width: 28px; height: 28px; font-size: 11px; }
    .avatar--md { width: 38px; height: 38px; font-size: 13px; }
    .avatar--lg { width: 56px; height: 56px; font-size: 18px; }
    .avatar--xl { width: 88px; height: 88px; font-size: 28px; }
  `]
})
export class AvatarComponent {
  @Input({ required: true }) set name(value: string) {
    this._name.set(value ?? '');
  }
  get name(): string {
    return this._name();
  }

  @Input() photoUrl?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  private readonly _name = signal('');

  readonly initials = computed(() => {
    const parts = this._name().trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  /** Stable colour per person: the same name always gets the same hue. */
  readonly background = computed(() => {
    const palette = [
      'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
      'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)'
    ];
    const name = this._name();
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }
    return palette[hash % palette.length];
  });
}
