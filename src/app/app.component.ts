import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchProfileStats } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store) { }

  public ngOnInit(): void {
    this.store.dispatch(new FetchProfileStats());
  }
}
