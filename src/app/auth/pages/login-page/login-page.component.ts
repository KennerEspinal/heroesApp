import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  constructor(private aS: AuthService, private router: Router) { }

  onLogin(){
    this.aS.login('kenner@gmail.com', '123456')
    .subscribe(
      user => {
        this.router.navigate(['/']);
      }
    );
  }
}
