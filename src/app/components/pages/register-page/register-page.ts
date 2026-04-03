import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password ) {
      username
    }
  }
`

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  providers: [Apollo],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private apollo: Apollo = inject(Apollo)

  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  submitRegister() {

    this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }
    }).subscribe({
      next: (result) => {
        console.log(result)
      }
    })
  }
}
