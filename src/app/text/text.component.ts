import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hits } from '../Hits';
import { Found } from '../found';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input() found: Found;
  id: number;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
  }

}
