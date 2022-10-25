import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  public token: string = "";

  private visible = new Subject<boolean>();

  public $visible = this.visible.asObservable();

  constructor(private http: HttpClient) {
    const localToken = localStorage.getItem("token");
    console.log("init token", localToken)
    if(localToken != null){
      this.token = localToken;
      this.visible.next(true);
    } else {
      this.visible.next(false);
    }
  }

  checkToken(token: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/nex/v1/`, {
      params: new HttpParams().set('token', token).set('text', 'Test object')
    });
  }

  setTokenValid(isValid: boolean): void {
    this.visible.next(isValid);
  }

  entityExtraction (text: string, minConf: number, include: {abstract: boolean, categories: boolean, image: boolean}): Observable<any> {
    let includeString = '';
    console.log(this.token)
    if(include.abstract) includeString += "abstract, ";
    if(include.categories) includeString += "categories, ";
    if(include.image) includeString += "image, ";
    includeString = includeString.slice(0, includeString.length - 2);
    console.log(includeString)
    return this.http.get(`${environment.BASE_URL}/nex/v1/`, {
      params: new HttpParams()
        .set('text', text)
        .set('min_confidence', minConf)
        .set('include', includeString)
        .set('token', this.token)
    })
  }

  textSimilarity(text1: string, text2: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/sim/v1/`, {
      params: new HttpParams()
        .set('text1', text1)
        .set('text2', text2)
        .set('token', this.token)
    })
  }

  languageDetection(text: string, clean: boolean): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/li/v1/`, {
      params: new HttpParams()
        .set('text', text)
        .set('clean', clean)
        .set('token', this.token)
    })
  }

  sentimentAnalysis(text: string, language: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/sent/v1/`, {
      params: new HttpParams()
        .set('lang', language)
        .set('text', text)
        .set('token', this.token)
    })
  }
}
