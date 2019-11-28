import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  libraryUrl = "api/library";
  scanUrl = "api/library/scan";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  getLibrary(): Observable<MovieFile[]> {
    return this.http.get<MovieFile[]>(this.libraryUrl).pipe(catchError(this.handleError));
  }

  scanLibrary(): Observable<MovieFile[]> {
    return this.http.get<MovieFile[]>(this.scanUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred', error.error.message);
    } else {
      console.error(`Backend returned error code: ${error.status} body was ${error.error}`);
    }

    return throwError('Error fetching your library. Try again...');
  }
}

// MovieFile represents a single movie in the library
export interface MovieFile {
  id: number;
  path: string;
  modified: boolean;
  metadata: MovieMetadata;
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
