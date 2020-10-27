import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfileStats } from './app.model';
import { DATABASE } from './database.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  constructor() { }

  public fetchStats(): Observable<ProfileStats> {
    return of(DATABASE.PROFILE_STATS);
  }
}
