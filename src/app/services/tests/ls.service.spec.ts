import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { AppState } from 'src/app/store/app.state';
import { LocalStorageService } from '../ls.service';


describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let store: Store<AppState>;
  const mockState: AppState = {
    users: {
      users: [],
      filteredUsers: [],
      filters: { name: '', role: '', status: '' },
      currentUserId: null,
      loading: false,
      error: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [LocalStorageService],
    });

    service = TestBed.inject(LocalStorageService);
    store = TestBed.inject(Store);

    spyOn(store, 'pipe').and.returnValue(of(mockState));
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockState));
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save state to localStorage on store changes', () => {
    service.init();

    expect(store.pipe).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'users',
      JSON.stringify(mockState)
    );
  });

  it('should load state from localStorage', () => {
    const loadedState = service.loadStateFromLocalStorage();

    expect(localStorage.getItem).toHaveBeenCalledWith('users');
    expect(loadedState).toEqual(mockState);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = spyOn(service['destroy$'], 'next').and.callThrough();
    const completeSpy = spyOn(service['destroy$'], 'complete').and.callThrough();

    service.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
