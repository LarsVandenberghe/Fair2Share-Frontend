import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProfile } from '../data_types/IProfile';
import { ISimpleProfile } from '../data_types/ISimpleProfile';
import { catchError, map, tap } from 'rxjs/operators';
import { IImageProfileInter } from '../data_types/IImageProfileInter';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  public loadingError$ = new Subject<string>();
  public imageCatch : IImageProfileInter[] = [];

  constructor(private http: HttpClient) { }

  getProfile$(): Observable<IProfile> {
    return this.http.get<IProfile>(`${environment.apiUrl}/Profile/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      })
    );
  }

  getSimpleProfile$(): Observable<ISimpleProfile> {
    return this.http.get<ISimpleProfile>(`${environment.apiUrl}/Profile/simple`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of(null);
      })
    );
  }

  setSimpleprofile$(simpleProfile: ISimpleProfile): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Profile/simple`, simpleProfile);

  }

  uploadImage$(fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);

    return this.http
      .post(`${environment.apiUrl}/Profile/image`, input);
  }

  getProfileImage$(id : number): Observable<Blob> {
    var temp : IImageProfileInter[] = this.imageCatch.filter(i => i.profileId === id);
    if (temp.length > 0){
      return Observable.create(obs => obs.next(temp.pop().image));
    } else {
      return this.http.get(`${environment.apiUrl}/Profile/image/${id}`, { responseType: 'blob' });
    }
  }

  deleteProfileImage$() {
    return this.http.delete(`${environment.apiUrl}/Profile/image`);
  }
}
