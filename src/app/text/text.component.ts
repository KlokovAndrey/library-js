import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Hits } from '../Hits';
import { Found } from '../found';
import { TextById } from '../TextById';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']

})
export class TextComponent implements OnInit {

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
<<<<<<< HEAD
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
=======
    this.svc.getText<Found>(this.id).subscribe(
      (data:Found) =>{
        this.found = data;
      });

    //this.Search();
    this.text = this.found.hits.hits[0]._source.Text;
    console.log(this.text);
  }

  Search(){
    //this.text = this.svc.getText(this.id);

    this.svc.getText<Found>(this.id).subscribe(
      (data:Found) =>{
        this.found = data;
      });
    this.text = this.found.hits.hits[0]._source.Text;

    }
}
>>>>>>> bbce2bdb1999964d0323c6ae4dc55885fe300f79
