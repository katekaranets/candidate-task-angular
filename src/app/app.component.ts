import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { appInitialize } from './store/actions/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Userlane Angular Task';

  constructor(private store: Store) {
    this.store.dispatch(appInitialize());
  }
}
