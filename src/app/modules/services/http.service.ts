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


  getBook<T>(query): Observable<T>{
    return this.http.post<T>(this.domen + '/lib/_search', {
      _source: [
        "Chapter",
        "Book"
      ],
        query: {
          bool: {
              filter: [],
              should: [
                  {
            multi_match: {
                query: query,
                
                fields: [
                  "Text",
                  "Book",
                  "Chapter"
                ]
              }
          },
          {
              multi_match: {
                query: query,
                fields: [
                  "Text",
                  "Book^5",
                 "Chapter^5"
                ],
                type: "phrase",
                boost: 7
            }
        }
      ]
    }
   },
      highlight: {
          pre_tags: [
              "<b>"
          ],
          post_tags: [
              "</b>"
          ],
          fields: {
              "Text": {}
          }
      }
     })
  }

  getText<T>(id): Observable<T>{
    return this.http.post<T>(this.domen+'/lib/_search', {
      query: {
        bool: {
            filter: [],
            should: [
                {
          multi_match: {
              query: id,
              fields: [
                "_id"
              ]
            }
        },
        {
            multi_match: {
              query: id,
              fields: [
                "_id"
              ],
              type: "phrase",
              boost: 7
          }
      }
    ]
  }
 }
   })
  }

}
