import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const headerDict = {
  "Content-Type": "application/json",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers":
      "Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent",
};

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};
@Injectable({
  providedIn: 'root'
})
export class RestService {
  private readonly API_URL = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) {}

  get(url:string):Observable<any>{
    return this.httpClient.get(this.API_URL + url, requestOptions);
  }
  post(url:string,body: any):Observable<any>{
    return this.httpClient.post(this.API_URL+url,body,requestOptions);
  }
  put(url:string,body:any):Observable<any>{
    return this.httpClient.put(this.API_URL,body,requestOptions);
  }
  delete(url:string):Observable<any>{
    return this.httpClient.delete(this.API_URL+url,requestOptions);
  }
}
