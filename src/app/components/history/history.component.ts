import { Component, OnInit } from '@angular/core';
import {HistoryService} from "../../services/history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(public historyService: HistoryService) {
    console.log(historyService.log)
  }

  ngOnInit(): void {
  }

}
