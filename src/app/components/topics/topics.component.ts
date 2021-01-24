import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Topic } from "../../models/topic";
import { TopicService } from "../../services/topic.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public topics: Array<Topic>;
  public totalPages;
  public page;
  public nextPage;
  public prevPage;
  public numberPages;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService
  ) {
    this.page_title = 'Temas';
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var page =+ params['page'];

      if(!page || page == null || page == undefined) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.getTopics(page);
    });
    
  }

  getTopics(page = 1){
    this._topicService.getTopics(page).subscribe(
      res => {
        if(res.topics) {
          this.topics = res.topics;

          //Navegacion de paginacion
          this.totalPages = res.totalPages;

          var numberPages = [];
          for(var i = 1; i <= this.totalPages; i++) {
            numberPages.push(i);
          }

          this.numberPages = numberPages;

          if(page >= 2) {
            this.prevPage = page - 1; 
          } else {
            this.prevPage = 1;
          }

          if(page < this.totalPages) {
            this.nextPage = page + 1;
          } else {
            this.nextPage = this.totalPages;
          }
        } else {
          this._router.navigate(['/inicio']);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
