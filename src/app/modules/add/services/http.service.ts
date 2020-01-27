import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  domen: string = 'https://search-elasticsearch-lib-fgzjpurnqqwi4pdizkk7ogcfue.us-east-2.es.amazonaws.com';

  constructor(private http: HttpClient) { }

  addChapter<T>(book, chapter, text): Observable<T>{
    return this.http.post<T>(this.domen + '/lib/_doc', {
      Book: book,  
      Chapter: chapter,
      Text: text
    })
  }


  isExist<T>(book, chapter): Observable<T>{
    return this.http.post<T>(this.domen + '/lib/_search', {
      query: { 
        bool: { 
          must: [
            { term : { 
              "Chapter" : {
                value: chapter
              }
              } 
            },
            { term : { 
              "Book" : {
                value: book
              }
              } 
            }
          ]
         }
       }
    })
  }


  deleteChapter<T>(id): Observable<T>{
    return this.http.delete<T>(this.domen + '/lib/_doc/' + id)
  }


}
