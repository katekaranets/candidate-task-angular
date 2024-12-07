import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';

import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly localStorageKey = 'users';

  constructor(private store: Store<AppState>) {
    this.init();
  }

  init(): void {
    this.store
      .pipe(debounceTime(500)) 
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
