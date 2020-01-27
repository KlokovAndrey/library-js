  import { Component, OnInit } from '@angular/core';
  import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Found } from '../../found'
import {HttpHeaders} from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { HttpServiceService } from 'src/app/modules/search/services/http-service.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  found: Found = null;
  query: string = ""     //Виконт
  

  constructor(private http: HttpClient,
    private svc: HttpServiceService) {
   }

  ngOnInit() {   
  }

    Search1(){       //work with service
      this.svc.getBook(this.query).subscribe(
        (data:Found) =>{
          this.found = data;
        });
    }

    Search2(){        //work without service
      
      this.http.post('http://localhost:9200/lib/_search', {
        query: {
          bool: {
              filter: [],
              should: [
                  {
            multi_match: {
                query: this.query,
                
                fields: [
                  "Text",
                  "Book",
                  "Chapter"
                ]
              }
          },
          {
              multi_match: {
                query: this.query,
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
            this.found = data;
               })
               console.log(this.found);
    }

}
