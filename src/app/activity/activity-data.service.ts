import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IActivity } from '../data_types/IActivity';
import { ISummary } from '../data_types/ISummary';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {
  public loadingError$ = new Subject<string>();
  public localActivityId : number;
  constructor(private http: HttpClient) { }

  addActivity$(
    name: string,
    description:string,
    currencyType: number
  ) : Observable<number>{ 
    return this.http.post<number>(
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

  deleteActivity$(id: number){
    return this.http.delete(`${environment.apiUrl}/Activity/${id}`);
  }

  getActivitySummary$(id: number) : Observable<ISummary[]>{
    return this.http.get(`${environment.apiUrl}/Activity/${id}/summary`).pipe(
      map( data => {
        var out : ISummary[] = [];
        for(var key in data) {
          out.push({key : parseInt(key, 10), value : parseFloat(data[key])});
        }
        return out;
      }),
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      })
    );
  }
}
