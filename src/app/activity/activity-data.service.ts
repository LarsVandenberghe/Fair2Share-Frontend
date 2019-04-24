import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IActivity } from '../data_types/IActivity';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {
  public loadingError$ = new Subject<string>();
  constructor(private http: HttpClient) { }

  addActivity$(
    name: string,
    description:string,
    currencyType: number
  ){ 
    return this.http.post(
        `${environment.apiUrl}/Activity`,
        {
          name,
          description,
          currencyType
        }
    );
  }

  getActivity$(id: number) : Observable<IActivity>{
      return this.http.get<IActivity>(`${environment.apiUrl}/Activity/${id}`).pipe(
        catchError(error => {
          this.loadingError$.next(error.statusText);
          return of(null);
        })
      );
    
  }
}
