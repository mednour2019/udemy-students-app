import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/Models/ApiModels/Gender.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseApiUrl=environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }
  getGenderList(): Observable<Gender[]>{
   return  this.httpClient.get<Gender[]>(this.baseApiUrl+'/genders');

  }
}
