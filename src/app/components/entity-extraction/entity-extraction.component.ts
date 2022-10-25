import { Component, OnInit } from '@angular/core';
import {fakeAsync} from "@angular/core/testing";
import {ApiService} from "../../services/api.service";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Annotation} from "../../models";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent implements OnInit {
  public entityModel = {
    text: "",
    minConf: 0,
    include: {
      image: false,
      abstract: false,
      categories: false
    },
  }
  public annotations: Annotation[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  setMinConf(value: string){
    this.entityModel.minConf = parseFloat(value);
  }

  handleIncludeCheck($event: any) {
    const targetElement = $event.target;
    if(targetElement != null){
      console.log(targetElement.value)
      switch (targetElement.value){
        case "image":
          this.entityModel.include.image = targetElement.checked;
          break;
        case "abstract":
          this.entityModel.include.abstract = targetElement.checked;
          break;
        default:
          this.entityModel.include.categories = targetElement.checked;
          break;
      }
    }
  }

  onSubmit() {
    this.apiService.entityExtraction(this.entityModel.text, this.entityModel.minConf, this.entityModel.include).subscribe(
      value => this.annotations = value.annotations,
      error => alert(error.error.message)
    )
    console.log(this.entityModel)
  }
}
