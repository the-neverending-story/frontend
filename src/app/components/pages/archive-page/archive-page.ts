import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GetCreationsResponse, GET_CREATIONS, Creation } from '../../../../graphql-types/creation';
import { Apollo } from 'apollo-angular';
import { CreationLink } from '../../reusable/creation-link/creation-link';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-archive-page',
  imports: [CreationLink, ReactiveFormsModule],
  templateUrl: './archive-page.html',
  styleUrl: './archive-page.scss',
})
export class ArchivePage implements OnInit {
  private apollo: Apollo = inject(Apollo)
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)

  filterForm = new FormGroup({
    category: new FormControl('none'),
    name: new FormControl(''),
    author: new FormControl('')
  })

  page = 1
  creations: Creation[] = [];
  isLoading = false

  ngOnInit(): void {
    this.search()
  }

  search() {
    if(this.filterForm.pristine) { return; }
    this.filterForm.markAsPristine()
    this.isLoading = true
    this.creations = [];
    this.ref.detectChanges();
    this.apollo.query<GetCreationsResponse>({
      query: GET_CREATIONS,
      variables: {
        page: this.page,
        category: this.filterForm.value.category,
        name: this.filterForm.value.name,
        author: this.filterForm.value.author
      }
    }).subscribe({
      next: ({ data }) => {
        this.isLoading = false
        this.creations = data!.getCreations;
        this.ref.detectChanges()
      }
    })
  }

}
