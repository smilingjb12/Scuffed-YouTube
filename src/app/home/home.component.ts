import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchHomeVideos } from '../app.actions';
import { Video } from '../app.model';
import { AppState } from '../app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public videos$: Observable<Video[]>;

  constructor(
    private store: Store,
    private router: Router) { }

  ngOnInit(): void {
    this.videos$ = this.store.select(AppState.getHomeVideos);
    this.store.dispatch(new FetchHomeVideos(null, null));
  }
}
