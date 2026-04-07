import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private router: Router = inject(Router)

  localStorage = localStorage
  
  logout() {
    this.localStorage.removeItem('user_data')
    this.router.navigate([''])
  }
}
