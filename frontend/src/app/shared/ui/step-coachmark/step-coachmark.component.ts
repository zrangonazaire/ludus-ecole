import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';
import { StepGuidanceService } from '@core/services/step-guidance.service';

@Component({
  selector: 'eduops-step-coachmark',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './step-coachmark.component.html',
  styleUrl: './step-coachmark.component.scss'
})
export class StepCoachmarkComponent {
  private readonly guidance = inject(StepGuidanceService);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly helpButton = viewChild<ElementRef<HTMLButtonElement>>('helpButton');
  private activeKey = '';
  private previousFocus: HTMLElement | null = null;

  readonly flow = input.required<string>();
  readonly stepKey = input.required<string>();
  readonly stepNumber = input.required<number>();
  readonly totalSteps = input.required<number>();
  readonly eyebrow = input('À savoir avant de commencer');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly points = input<readonly string[]>([]);
  readonly ctaLabel = input('J’ai compris, commencer');
  readonly accepted = output<void>();

  readonly visible = signal(false);
  readonly idPrefix = computed(() =>
    `coachmark-${this.flow()}-${this.stepKey()}`.replace(/[^a-z0-9_-]/gi, '-')
  );
  readonly titleId = computed(() => `${this.idPrefix()}-title`);
  readonly descriptionId = computed(() => `${this.idPrefix()}-description`);

  constructor() {
    effect(() => {
      const flow = this.flow();
      const step = this.stepKey();
      const key = `${flow}:${step}`;
      if (key === this.activeKey) {
        return;
      }
      this.activeKey = key;
      if (!this.guidance.isSeen(flow, step)) {
        this.show();
      } else {
        this.visible.set(false);
      }
    }, { allowSignalWrites: true });
  }

  open(): void {
    this.show();
  }

  dismiss(): void {
    this.guidance.markSeen(this.flow(), this.stepKey());
    this.visible.set(false);
    setTimeout(() => {
      const previous = this.previousFocus;
      const target = previous && previous !== document.body && previous.isConnected
        ? previous
        : this.helpButton()?.nativeElement;
      target?.focus();
    });
  }

  accept(): void {
    this.guidance.markSeen(this.flow(), this.stepKey());
    this.visible.set(false);
    this.accepted.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.visible()) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.dismiss();
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }

    const panel = this.panel()?.nativeElement;
    const focusable = panel?.querySelectorAll<HTMLElement>('button, [href], [tabindex="0"]');
    if (!focusable?.length) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;
    if (!panel?.contains(activeElement)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && (activeElement === first || activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusPanel(): void {
    setTimeout(() => this.panel()?.nativeElement.focus());
  }

  private show(): void {
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      this.previousFocus = document.activeElement;
    }
    this.visible.set(true);
    this.focusPanel();
  }
}
