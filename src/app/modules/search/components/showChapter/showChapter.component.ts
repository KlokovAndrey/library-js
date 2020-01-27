import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Found } from '../../found';
import { HttpServiceService } from '../../services/http-service.service';

@Component({
  selector: 'app-text',
  templateUrl: './showChapter.component.html',
  styleUrls: ['./showChapter.component.css']

})
export class ShowChapterComponent implements OnInit {

  id: string;
  text: string;
  found: Found;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private svc: HttpServiceService
    
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.Search();
    console.log(this.found);
    
  }

  Search(){
    this.svc.getText<Found>(this.id).subscribe(
      (data:Found) =>{
        this.found = data;
        this.text = this.found.hits.hits[0]._source.Text;
      });
 
    }
  }