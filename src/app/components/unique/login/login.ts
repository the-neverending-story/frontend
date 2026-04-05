import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  providers: [Router],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private router: Router = inject(Router)

  localStorage = localStorage
  
  logout() {
    this.router.navigate(['/'])
    this.localStorage.removeItem('user_data')
  }
}
