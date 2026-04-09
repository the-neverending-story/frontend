import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { GetCreationsResponse, GET_CREATIONS, Creation } from '../../../../graphql-types/creation';
import { Apollo } from 'apollo-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-archive-page',
  imports: [RouterLink],
  templateUrl: './archive-page.html',
  styleUrl: './archive-page.scss',
})
export class ArchivePage implements OnInit {
  private apollo: Apollo = inject(Apollo)
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)

  page = 1
  creations: Creation[] = [];

  ngOnInit(): void {
    this.apollo.query<GetCreationsResponse>({
      query: GET_CREATIONS,
      variables: {
        page: this.page
      }
    }).subscribe({
      next: ({ data }) => {
        this.creations = data!.getCreations;
        this.ref.detectChanges()
      }
    })
  }

}
