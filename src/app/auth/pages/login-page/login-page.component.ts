import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(private _authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    this._authService.login('omarmi15200@gmail.com', 'gaa')
      .subscribe(user => {
        console.log(user)
        this.router.navigate(["heroes/list"])
      })
  }

}
