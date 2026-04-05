import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const LOGIN = gql`
  mutation Login( $username: String!, $password: String! ) {
    login( username: $username, password: $password ) {
      username
    }
  }
`

interface LoginResponse {
  login: {
    username: string,
    role: string
  }
}

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  providers: [Apollo, Router],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private apollo: Apollo = inject(Apollo)
  private router: Router = inject(Router)

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  submitLogin() {

    this.apollo.mutate<LoginResponse>({
      mutation: LOGIN,
      variables: {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
    }).subscribe({
      next: ({ data }) => {
        this.router.navigate(['/'])
        localStorage.setItem('user_data', JSON.stringify({username: data?.login.username, role: data?.login.role}))
      }
    })

  }
}
