import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Found } from 'src/app/modules/search/found';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.css']
})
export class AddChapterComponent implements OnInit {

  book: string = "";
  chapter: string = "";
  text: string = "";
  found: Found = null;

  constructor(private svc: HttpService) { }

  ngOnInit() {
  }


  add(){
    if(this.book == "" || this.chapter == "" || this.text == "") return;

    this.svc.isExist(this.book, this.chapter).subscribe(
      (data:Found) =>{
        this.found = data;
        console.log(this.found);
        if(this.found.hits.hits.length!=0){
          this.svc.deleteChapter(this.found.hits.hits[0]._id).subscribe(
            (data:Found) =>{
            });
        }

        this.svc.addChapter(this.book, this.chapter, this.text).subscribe(
          (data:Found) =>{
          });
  
          this.book = "";
          this.chapter = "";
          this.text = "";
      });

      

      
  }

}
