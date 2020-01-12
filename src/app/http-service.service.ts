import { Injectable } from '@angular/core';
import { Found } from './found';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  found: Found = null;

  constructor(private http: HttpClient) { }

  getBook(query): Found{
    this.http.post('http://localhost:9200/lib/_search', {
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
        .subscribe(
          (data:Found) =>{
            console.log(data);
            this.found = data;
               }) 
               return this.found;
  }

  getText(id): Found{
    this.http.post('http://localhost:9200/lib/_search', {
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
      .subscribe(
        (data:Found) =>{
          console.log(data);
          this.found = data;
          //return data.hits.hits[0]._source.Text;
          return this.found;
             })
             return this.found;
  }
}
