import { Injectable } from '@angular/core';
import {Log} from "../models";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public log: Log[] = [];

  constructor() { }

  add(log: Log) {
    this.log.push(log);
  }
}
