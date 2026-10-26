import { Injectable, computed, signal } from '@angular/core';
import { createUuid } from '../utils/uuid';

export interface HomeworkAssignment {
  id: string;
  classroomName: string;
  subjectName: string;
  title: string;
  description: string;
  dueDate: string;
  teacherName: string;
  createdAt: string;
  completed: boolean;
}

const HOMEWORK_STORAGE_KEY = 'eduops.homework.v1';

@Injectable({ providedIn: 'root' })
export class HomeworkService {
  private readonly _items = signal<HomeworkAssignment[]>(this.load());

  readonly items = this._items.asReadonly();
  readonly pendingCount = computed(() =>
    this._items().filter((item) => !item.completed).length
  );

  add(payload: {
    classroomName: string;
    subjectName: string;
    title: string;
    description: string;
    dueDate: string;
    teacherName: string;
  }): HomeworkAssignment {
    const entry: HomeworkAssignment = {
      id: createUuid(),
      classroomName: payload.classroomName.trim() || '3ème A',
      subjectName: payload.subjectName.trim() || 'Mathématiques',
      title: payload.title.trim(),
      description: payload.description.trim(),
      dueDate: payload.dueDate,
      teacherName: payload.teacherName.trim() || 'M. Kouassi',
      createdAt: new Date().toISOString().slice(0, 10),
      completed: false
    };
    const next = [entry, ...this._items()];
    this._items.set(next);
    this.save(next);
    return entry;
  }

  toggleCompleted(id: string): void {
    const next = this._items().map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    this._items.set(next);
    this.save(next);
  }

  remove(id: string): void {
    const next = this._items().filter((item) => item.id !== id);
    this._items.set(next);
    this.save(next);
  }

  private load(): HomeworkAssignment[] {
    try {
      const raw = localStorage.getItem(HOMEWORK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    const inTwoDays = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
    const inFourDays = new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10);
    return [
      {
        id: 'hw-1',
        classroomName: '3ème A',
        subjectName: 'Mathématiques',
        title: 'Théorème de Thalès — Exercices d’application',
        description: 'Faire les exercices n° 4, 7 et 9 page 84 du manuel. Rédiger la démonstration complète sur le cahier d’exercices.',
        dueDate: tomorrow,
        teacherName: 'M. Kouassi N’Guessan',
        createdAt: new Date().toISOString().slice(0, 10),
        completed: false
      },
      {
        id: 'hw-2',
        classroomName: '3ème A',
        subjectName: 'Français',
        title: 'Lecture suivie & résumé du chapitre 3',
        description: 'Lire le chapitre 3 de l’œuvre au programme et rédiger un résumé de 10 lignes en relevant trois figures de style.',
        dueDate: inTwoDays,
        teacherName: 'Mme Konan Aya',
        createdAt: new Date().toISOString().slice(0, 10),
        completed: false
      },
      {
        id: 'hw-3',
        classroomName: '5ème B',
        subjectName: 'Physique-Chimie',
        title: 'Schéma du circuit électrique en série',
        description: 'Reproduire au propre le schéma du montage vu en classe et apprendre les symboles normalisés.',
        dueDate: inTwoDays,
        teacherName: 'M. Bamba Seydou',
        createdAt: new Date().toISOString().slice(0, 10),
        completed: false
      },
      {
        id: 'hw-4',
        classroomName: '3ème A',
        subjectName: 'Anglais',
        title: 'Vocabulaire Unit 2 & dialogue écrit',
        description: 'Réviser les verbes irréguliers (liste 1 à 30) et préparer un court dialogue de 6 répliques.',
        dueDate: inFourDays,
        teacherName: 'Mme Diallo Fatou',
        createdAt: new Date().toISOString().slice(0, 10),
        completed: true
      }
    ];
  }

  private save(items: HomeworkAssignment[]): void {
    try {
      localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }
}
