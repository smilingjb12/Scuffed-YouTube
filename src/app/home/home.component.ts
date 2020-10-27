import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryToggled, FetchCategories, FetchHomeVideos } from '../app.actions';
import { Video } from '../app.model';
import { AppState } from '../app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public videos: Video[];
  public categories$: Observable<string[]>;
  public selectedCategory: string;

  constructor(
    private store: Store) { }

  public ngOnInit(): void {
    this.store.select(AppState.getHomeVideos)
      .subscribe(videos => this.videos = videos);
    this.categories$ = this.store.select(AppState.getCategories);
    this.store.select(AppState.getSelectedCategory).subscribe(c => {
      this.selectedCategory = c;
    });
    this.store.dispatch(new FetchHomeVideos(null, null));
    this.store.dispatch(new FetchCategories());
  }

  public isSelected(category: string): boolean {
    return category === this.selectedCategory;
  }

  public toggleCategory(category: string): void {
    this.store.dispatch(new CategoryToggled(category))
      .subscribe(() => {
        this.store.dispatch(new FetchHomeVideos(null, this.selectedCategory));
      });
  }
}
