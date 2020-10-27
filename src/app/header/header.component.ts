import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProfileStats } from '../app.model';
import { AppState } from '../app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public stats: ProfileStats;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.store.select(AppState.getProfileStats)
      .subscribe(stats => this.stats = stats);
  }

}
