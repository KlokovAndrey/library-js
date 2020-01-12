  import { Component, OnInit } from '@angular/core';
  import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Found } from '../../found'
import {HttpHeaders} from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { HttpServiceService } from 'src/app/http-service.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  found: Found = null;
  took: Found = null;
  query: string = ""     //Виконт
  str: any;
  book: string;
  chapter: string;
  text: string;
  highlight: string;
  arr_books:string[];
  arr_chapters:string[];
  arr_texts:string[];
  arr_highlights: string[];
  lib: any;
  

  constructor(private http: HttpClient,
    private svc: HttpServiceService) {
   }

  ngOnInit() {   
  }

    Create(){
      this.http.post('http://localhost:9200/books/_doc', {
      book: "Ангелы и демоны",  
      title: '1',
        })
        .subscribe(
        res => {
        console.log(res);
        },
        err => {
        console.log('Error occured');
        }
        );
    }

    Search1(){       //work with service
      this.found = this.svc.getBook(this.query);
      console.log(this.found);
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
        
          // response => {
            
          //   this.str = response.json();
          //   console.log(this.str);
          // })
    }

    Search(){
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
  //     highlight: {
  //         pre_tags: [
  //             "<b>"
  //         ],
  //         post_tags: [
  //             "</b>"
  //         ],
  //         fields: {
  //             "Text": {}
  //         }
  //     }
     })
        .subscribe(
          data =>{
            const dataStr = JSON.stringify(data);
            JSON.parse(dataStr, (key, value) => {
              if (key === 'Book') {
                this.book = value;
              }
              if(key === 'Chapter'){
                this.chapter = value;
              }
              if(key === 'Text'){
                this.text = value;
              }
              if(key === "highlight"){
                JSON.parse(key, (key, value) => {
                  if (key === 'Text') {
                    this.highlight = value;
                  }
            });

              }
              
          })
        }
      );

    }


    Test(){
      
      this.http.post('http://jsonplaceholder.typicode.com/posts', {
        title: 'foo',
        body: 'bar',
        userId: 1
        })
        .subscribe(
        res => {
        console.log(res);
        },
        err => {
        console.log('Error occured');
        }
        );
    }


    submit(){
      
       const contentHeaders1 = new HttpHeaders()
       .set('Content-Type', 'application/json; charset=utf-8')
       .set('Access-Control-Allow-Origin', 'http://localhost:4200')
       .set('Access-Control-Allow-Methods', 'POST')
       .set('Access-Control-Allow-Credentials', 'true');

console.log("headers ", contentHeaders1.getAll('Content-Type'));
console.log("headers ", contentHeaders1.getAll('Access-Control-Allow-Origin'));


        this.http.post('http://localhost:9200/lib/_search', {
        //this.http.post('https://www.jsontest.com/', {
          query: {
            bool: {
                filter: [],
                should: [
                    {
              multi_match: {
                  query: "день рождения",
                  
                  fields: [
                    "Text",
                    "Book",
                    "Chapter"
                  ]
                }
            },
            {
                multi_match: {
                  query: "день рождения",
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

//}, {headers: contentHeaders1})
  })
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }
}
