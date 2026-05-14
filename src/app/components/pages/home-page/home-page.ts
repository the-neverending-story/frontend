import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Creation, GET_FEATURED_CREATIONS, GetFeaturedCreationsResponse } from '../../../../graphql-types/creation';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnInit {
  private apollo: Apollo = inject(Apollo);
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)

  creations: Creation[] = []

  ngOnInit(): void {
    this.apollo.query<GetFeaturedCreationsResponse>({
      query: GET_FEATURED_CREATIONS,
    }).subscribe({  
      next: ({ data }) => {
        this.creations = Array(5).fill(data!.getFeaturedCreations).flat() // temporary fix until more creations are added
        this.ref.detectChanges()
      }
    })
  }

}
