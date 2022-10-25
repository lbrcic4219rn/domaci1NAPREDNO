import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent implements OnInit {
  public entityModel = {
    text1: "",
    text2: "",
  };
  public result: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }


  onSubmit() {
    this.apiService.textSimilarity(this.entityModel.text1, this.entityModel.text2).subscribe(
      value => this.result = value.similarity,
      error => alert(error.error.message)
    )
  }
}
