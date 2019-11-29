import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  metadataAPI = "http://localhost:8080/?";
  libraryUrl = "api/library";
  scanUrl = "api/library/scan";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  getLibrary(): Observable<MovieFile[]> {
    return this.http.get<MovieFile[]>(this.libraryUrl).pipe(catchError(this.handleError));
  }

  scanLibrary(): Observable<MovieFile[]> {
    return this.http.get<MovieFile[]>(this.scanUrl).pipe(catchError(this.handleError));
  }

  searchQuery(title: string = "", year: string = "", offset: number = 0): Observable<APIResult> {
    let params = new HttpParams();

    if (year === "" && title === "") {
      return
    }

    if (title !== "") {
      params = params.append("title", title);
    }
    if (year !== "") {
      params = params.append("year", year);
    }
    params = params.append("offset", offset.toString());

    const query = params.toString();

    console.log(query);

    return this.http.get<APIResult>(this.metadataAPI + query).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred', error.error.message);
    } else {
      console.error(`Backend returned error code: ${error.status} body was ${error.error}`);
    }

    return throwError('Error loading data... Please try again...');
  }
}

// MovieFile represents a single movie in the library
export interface MovieFile {
  id: number;
  path: string;
  modified: boolean;
  metadata: MovieMetadata;
}

export interface APIResult {
  total: number;
  movies: MovieMetadata[];
}

export interface MovieMetadata {
  id: number;
  url: string;
  poster: string;
  rating: string;
  summary: string;
  title: string;
  year: string;
}
