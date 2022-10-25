import { Component, OnInit } from '@angular/core';
import {DetectedLanguage} from "../../models";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent implements OnInit {
  entityModel = {
    text: "",
    clean: false,
  };
  detectedLanguages: DetectedLanguage[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService.languageDetection(this.entityModel.text, this.entityModel.clean).subscribe(
      value => this.detectedLanguages = value.detectedLangs,
      error => alert(error.error.message)
    )
  }

  handleCleanCheck($event: any) {
    const targetElement = $event.target;
    if(targetElement != null){
          this.entityModel.clean = targetElement.checked;
    }
  }
}
