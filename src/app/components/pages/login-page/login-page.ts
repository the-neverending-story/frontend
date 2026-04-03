import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const LOGIN = gql`
  mutation Login( $username: String!, $password: String! ) {
    login( username: $username, password: $password ) {
      username
    }
  }
`

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  providers: [Apollo],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private apollo: Apollo = inject(Apollo)

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  submitLogin() {

    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
    }).subscribe({
      next: (result) => {
        console.log(result)
      }
    })

  }
}
