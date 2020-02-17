  import { Component, OnInit } from '@angular/core';
  import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Found } from '../../found'
import {HttpHeaders} from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';
import { Hero } from './Hero'
import { HttpService } from 'src/app/modules/services/http.service';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  found: Found = null;
  query: string = "";
  isAdmin: boolean;
  loading: boolean = false;
  

  constructor(private http: HttpClient,
    private svc: HttpService, private keycloakService:KeycloakService) {
   }

   async ngOnInit() {  
    if (await this.keycloakService.isLoggedIn()) {
      this.isAdmin = this.keycloakService.isUserInRole('admin');
    }
     
  }

    search(){       //work with service
      this.loading = true;
      this.svc.getBook(this.query).subscribe(
        (data:Found) =>{
          this.found = data;
          this.loading = false;
        });
    }



    delete(id){
      this.svc.deleteChapter(id).subscribe(
        (data:Found) =>{
        });
    }

}
