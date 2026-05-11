import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CreateCreationResponse, CREATE_CREATION, Creation, GetCreationsResponse, GET_CREATIONS } from '../../../../graphql-types/creation';

type IdAndName = Pick<Creation, "id" | "name">;

@Component({
  selector: 'app-create-page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './create-page.html',
  styleUrl: './create-page.scss',
})
export class CreatePage implements OnInit {

  private apollo: Apollo = inject(Apollo)
  private router: Router = inject(Router)
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)

  searchDelay?: number; // setTimeout return type

  relations: IdAndName[] = []

  selectedRelations: Set<string> = new Set<string>();

  creationForm = new FormGroup({
    category: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    tagSearch: new FormControl('')
  })

  ngOnInit() {
    if (!localStorage.getItem('user_data')) {
      this.router.navigate(['register'])
    }
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.value.length === 0) { this.relations = []; return }
    clearTimeout(this.searchDelay)
    this.searchDelay = setTimeout(() => { this.realSearch(target.value) }, 300)
  }

  realSearch(substring: string) {
    this.apollo.query<GetCreationsResponse>({
      query: GET_CREATIONS,
      variables: {
        page: 1,
        name: substring,
        isCanon: true,
      }
    }).subscribe({
      next: ({ data }) => {
        this.relations = data!.getCreations
        this.ref.detectChanges()
      }
    })
  }

  relationSelected(e: Event, id: string) {
    const target = e.target as HTMLInputElement;
    if(target.checked) { this.selectedRelations.add(id) } else { this.selectedRelations.delete(id) }
  }

  submitCreation() {
    if (this.creationForm.invalid) { return; }
    this.apollo.mutate<CreateCreationResponse>({
      mutation: CREATE_CREATION,
      variables: {
        name: this.creationForm.value.name,
        category: this.creationForm.value.category,
        content: this.creationForm.value.content,
        relations: [...this.selectedRelations]
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
