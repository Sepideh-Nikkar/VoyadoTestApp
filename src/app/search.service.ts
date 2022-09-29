import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SearchHits } from './SearchHit.model';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}
  getSearchResult(
    keyword: string,
    githubApiToken: string
  ): Observable<SearchHits> {
    return this.http.get<SearchHits>(
      '/api?keyword=' +
        encodeURIComponent(keyword) +
        '&githubApiToken=' +
        githubApiToken,
      {}
    );
  }
}
