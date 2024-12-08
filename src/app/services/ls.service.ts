import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements OnDestroy {
  private readonly localStorageKey = 'users';
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  init(): void {
    this.store
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500)
      ) 
      .subscribe((state) => {
        this.saveStateToLocalStorage(state);
      });
  }

  saveStateToLocalStorage(state: AppState): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(state));
  }

  loadStateFromLocalStorage(): AppState | undefined {
    const rawState = localStorage.getItem(this.localStorageKey);
    return rawState ? JSON.parse(rawState) : undefined;
  }
}
