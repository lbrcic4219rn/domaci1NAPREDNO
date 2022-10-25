import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public token: string = "";
  public localToken: string = "";

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const localTkn = localStorage.getItem('token')
    if (localTkn != null) {
      this.apiService.setTokenValid(true)
      this.localToken = localTkn;
    } else this.apiService.setTokenValid(false);
  }

  onSubmit (): void {
    this.apiService.checkToken(this.token).subscribe(
      value => {
        this.apiService.setTokenValid(true);
        localStorage.setItem('token', this.token);
        this.apiService.token = this.token;
        this.localToken = this.token;
        this.token = "";
      }, error => {
        alert("INVALID TOKEN")
        //this.apiService.setTokenValid(false);
      }
    )
  }

}
