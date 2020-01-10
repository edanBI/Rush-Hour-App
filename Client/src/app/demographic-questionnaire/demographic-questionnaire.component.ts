import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ConstantsService } from '../common/services/constants.service';

@Component({
  selector: 'app-demographic-questionnaire',
  templateUrl: './demographic-questionnaire.component.html',
  styleUrls: ['./demographic-questionnaire.component.css']
})
export class DemographicQuestionnaireComponent implements OnInit {
  endpoint = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  myForm: FormGroup;

  constructor(private http: HttpClient, private fb:FormBuilder, private _c: ConstantsService) {
  }

  ngOnInit() {
    this.myForm= this.fb.group({
      workerID: ['',[
        Validators.required
      ]],
      age:[null,[
        Validators.required,
        Validators.minLength(2),
        Validators.min(18),
        Validators.max(120)
      ]],
      gender:['',[
        Validators.required
      ]],
      education:['',[
        Validators.required
      ]],
      country:['',[
        Validators.required

      ]]
    });
  }
  get age() {
    return this.myForm.get('age');
  }

  get country(){
    return this.myForm.get('country');
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  addUser(): Observable<any> {
    console.log(this.myForm.value);
    return this.http.post<any>(this.endpoint + 'user', JSON.stringify(this.myForm.value), this.httpOptions).pipe(
      tap((res) => console.log(`added user w/ id=${res.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
