import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent implements OnInit {

  public entityModel = {
    text: "",
    language: "auto"
  };
  public sentiment = {
    score: 0,
    type: '',
  };

  public sentimentTest: number = -1;

  private colorRed = { r: 255, g: 0, b: 0 };
  private colorGreen = { r: 0, g: 255, b: 0 };

  public options = [
    { id: 'auto', name: 'Auto Detect' },
    { id: 'en', name: 'English' },
    { id: 'it', name: 'Italian' },
  ];

  sentimentColor = {
    r:
      this.colorRed.r +
      (this.colorGreen.r - this.colorRed.r) *
      this.normalizeValue(this.sentimentTest),
    g:
      this.colorRed.g +
      (this.colorGreen.g - this.colorRed.g) *
      this.normalizeValue(this.sentimentTest),
    b:
      this.colorRed.b +
      (this.colorGreen.b - this.colorRed.b) *
      this.normalizeValue(this.sentimentTest),
  };

  constructor (private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService
      .sentimentAnalysis(this.entityModel.text, this.entityModel.language).subscribe(
        value => {
          this.sentiment = value.sentiment;
          this.sentimentColor = {
            r:
              this.colorRed.r +
              (this.colorGreen.r - this.colorRed.r) *
              this.normalizeValue(this.sentiment.score),
            g:
              this.colorRed.g +
              (this.colorGreen.g - this.colorRed.g) *
              this.normalizeValue(this.sentiment.score),
            b:
              this.colorRed.b +
              (this.colorGreen.b - this.colorRed.b) *
              this.normalizeValue(this.sentiment.score),
          };
        },
      error => alert(error.error.message));
  }

  normalizeValue(value: number): number {
    return (value - -1) / (1 - -1);
  }

  handleChange($event: any) {
    this.entityModel.language = $event.target.value;
  }
}
