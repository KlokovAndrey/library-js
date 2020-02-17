import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Found } from '../../found';
import { HttpService } from 'src/app/modules/services/http.service';

@Component({
  selector: 'app-text',
  templateUrl: './showChapter.component.html',
  styleUrls: ['./showChapter.component.css']

})
export class ShowChapterComponent implements OnInit {

  id: string;
  text: string;
  found: Found;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private svc: HttpService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.search();
    console.log(this.found);
    
    
  }

  search(){
    this.loading = true;
    this.svc.getText<Found>(this.id).subscribe(
      (data:Found) =>{
        this.found = data;
        this.loading = false;
        this.text = this.found.hits.hits[0]._source.Text;
      });
      
    
    }
  }