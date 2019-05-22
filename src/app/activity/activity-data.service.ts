import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IActivity } from '../data_types/IActivity';
import { ISummary } from '../data_types/ISummary';
import { IFriend } from '../data_types/IFriend';
import { ITransaction } from '../data_types/ITransaction';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {
  public loadingError$ = new Subject<string>();
  public localActivity : IActivity;
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

  removeParticipantsFromActivity$(id : number, parts : IFriend[]) : Observable<any>{
    var params : string = "?";
    params += parts.map(e => `friend_ids=${e.profileId}`).join('&');
    return this.http.delete(`${environment.apiUrl}/Activity/${id}/participants${params}`
   );
  }

  addParticipantsToActivity$(id : number, parts : IFriend[]) : Observable<any>{
    return this.http.post(`${environment.apiUrl}/Activity/${id}/participants`,
      parts.map(e => e.profileId)
   );
  }

  getTransactions$(id : number) : Observable<ITransaction[]>{
    return this.http.get<ITransaction[]>(`${environment.apiUrl}/Activity/${id}/transactions`);
  }

  getTransaction$(id : number, transactionId: number) : Observable<ITransaction>{
    return this.http.get<ITransaction>(`${environment.apiUrl}/Activity/${id}/transactions/${transactionId}`);
  }

  removeTransaction$(id : number, transactionId: number){
    return this.http.delete(`${environment.apiUrl}/Activity/${id}/transactions/${transactionId}`);
  }

  addTransaction$(id: number, transaction : ITransaction){
    return this.http.post(`${environment.apiUrl}/Activity/${id}/transactions`, transaction);
  }

  updateTransaction$(id : number, transactionId: number, transaction : ITransaction){
    ///api/Activity/{id}/transactions/{transaction_id}
    return this.http.put(`${environment.apiUrl}/Activity/${id}/transactions/${transactionId}`, transaction);
  }

  removeParticipantsFromTransaction$(id : number, transactionId: number, parts : IFriend[]) : Observable<any>{
    var params : string = "?";
    params += parts.map(e => `friend_ids=${e.profileId}`).join('&');
    return this.http.delete(`${environment.apiUrl}/Activity/${id}/transactions/${transactionId}/participants${params}`
   );
  }

  addParticipantsToTransaction$(id : number, transactionId: number, parts : IFriend[]) : Observable<any>{
    console.log(`${environment.apiUrl}/Activity/${id}/transactions​/${transactionId}​/participants`);
    return this.http.post(`${environment.apiUrl}/Activity/${id}/transactions/${transactionId}/participants/`,  
      parts.map(e => e.profileId)
   );
  }

  currencyTypeSymbol(currencyType: number) : string{
    if (currencyType === 0){
      return `€`;
    } else if (currencyType === 1){
      return `$`;
    } else if (currencyType === 2){
      return `£`;
    }
  }

  // /api​/Activity​/{id}​/transactions​/{transaction_id}​/participants
}
