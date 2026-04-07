import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password ) {
      username
    }
  }
`

interface RegisterResult {
  register: {
    username: string,
    role: string
  }
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private apollo: Apollo = inject(Apollo)
  private router: Router = inject(Router)

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')]),
    username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
    confirmpassword: new FormControl('', [Validators.required])
  })

  submitRegister() {
    if(this.registerForm.invalid || this.registerForm.value?.password !== this.registerForm.value?.confirmpassword) { return; }
    
    this.apollo.mutate<RegisterResult>({
      mutation: REGISTER,
      variables: {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }
    }).subscribe({
      next: ({ data }) => {
        this.router.navigate([''])
        localStorage.setItem('user_data', JSON.stringify({username: data?.register.username, role: data?.register.role}))
      },
      error: (error) => {
        alert(error.message)
      }
    })
  }
}
