import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { IFriend } from '../data_types/IFriend';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestDataService {
  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  getFriendRequests$(): Observable<IFriend[]> {
    return this.http.get<IFriend[]>(`${environment.apiUrl}/FriendRequest/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      })
    );
  }

  handleFriendRequest$(futurFriendId: number, accept:boolean): Observable<any> {
    return this.http.post(`${environment.apiUrl}/FriendRequest/${futurFriendId}/${accept}`, {})
  }
}
