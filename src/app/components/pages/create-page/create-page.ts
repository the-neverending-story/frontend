import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CreateCreationResponse, CREATE_CREATION } from '../../../../graphql-types/creation';

@Component({
  selector: 'app-create-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-page.html',
  styleUrl: './create-page.scss',
})
export class CreatePage implements OnInit {

  private apollo: Apollo = inject(Apollo)
  private router: Router = inject(Router)

  creationForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    if (!localStorage.getItem('user_data')) {
      this.router.navigate(['register'])
    }
  }

  submitCreation() {
    if (this.creationForm.invalid) { return; }

    this.apollo.mutate<CreateCreationResponse>({
      mutation: CREATE_CREATION,
      variables: {
        name: this.creationForm.value.name,
        category: this.creationForm.value.category,
        content: this.creationForm.value.content
      }
    }).subscribe({
      next: ({ data }) => {
        this.router.navigate(['archive', data?.createCreation.id]);
      },
      error: (error) => {
        alert(error.message)
      },
    })
  }
}
