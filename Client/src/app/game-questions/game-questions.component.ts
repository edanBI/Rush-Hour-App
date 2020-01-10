import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-game-questions',
  templateUrl: './game-questions.component.html',
  styleUrls: ['./game-questions.component.css']
})
export class GameQuestionsComponent implements OnInit {
  endpoint = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  myForm: FormGroup;

  constructor(private http: HttpClient, private fb:FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      q1: ['',[
        Validators.required
      ]],
      q2: ['',[
        Validators.required
      ]],
      q3: ['',[
        Validators.required,
        Validators.max(10),
        Validators.min(1)
      ]]
    });
  }

  get q1(){
    return this.myForm.get('q1');
  }

  get q2(){
    return this.myForm.get('q1');
  }

  get q3(){
    return this.myForm.get('q1');
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
