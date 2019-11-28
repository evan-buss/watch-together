import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  libraryUrl = "api/library";
  scanUrl = "api/library/scan";

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  getLibrary(): Observable<MovieFile[]> {
    return this.http.get<MovieFile[]>(this.libraryUrl);
  }

  scanLibrary(): Observable<MovieFile[]> {
    return this.http.get<MovieFile[]>(this.scanUrl);
  }
}

// MovieFile represents a single movie in the library
export interface MovieFile {
  id: number;
  path:  string;
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
