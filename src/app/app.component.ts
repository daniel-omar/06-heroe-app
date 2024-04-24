import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'heroes-app';

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.checkAuthentication()
      .subscribe(result => {
        // console.log(result)
      });
  }

}
