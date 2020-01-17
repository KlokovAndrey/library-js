import { Injectable } from '@angular/core';
import { Found } from './found';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  found: Found = null;
  domen: string = 'https://search-elasticsearch-lib-fgzjpurnqqwi4pdizkk7ogcfue.us-east-2.es.amazonaws.com';

  constructor(private http: HttpClient) { }

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
