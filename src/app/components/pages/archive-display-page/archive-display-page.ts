import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CREATION, GetCreationResponse } from '../../../../graphql-types/creation';
import { RATE } from '../../../../graphql-types/rate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive-display-page',
  imports: [],
  templateUrl: './archive-display-page.html',
  styleUrl: './archive-display-page.scss',
})
export class ArchiveDisplayPage implements OnInit {
  private apollo: Apollo = inject(Apollo);
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)
  private router: Router = inject(Router)

  @Input() id!: string;
  name = '';
  content = '';
  authorUsername = '';
  rating = 0;
  category = ''
  isLoading = true;
  currentUserVote = '';

  ngOnInit(): void {
    this.apollo.query<GetCreationResponse>({
      query: GET_CREATION,
      variables: {
        id: this.id
      }
    }).subscribe({
      next: ({ data }) => {
        this.name = data!.getCreation.name;
        this.content = data!.getCreation.content
        this.authorUsername = data!.getCreation.author_username;
        this.rating = data!.getCreation.rating;
        this.category = data!.getCreation.category;
        this.currentUserVote = data!.getRate.is_positive;
        this.isLoading = false

        this.ref.detectChanges()
      }
    })
  }

  ratePositive() {
    this.rating += this.currentUserVote === "false" ? 2 : 1;
    this.currentUserVote = "true"
    if(!localStorage.getItem('user_data')) { this.router.navigate(['register']); }
    this.apollo.mutate({
      mutation: RATE,
      variables: {
        creationId: this.id,
        isPositive: true
      }
    }).subscribe()
  }

  rateNegative() {
    this.rating -= this.currentUserVote === "true" ? 2 : 1;
    this.currentUserVote = "false"
    if(!localStorage.getItem('user_data')) { this.router.navigate(['register']); }
    this.apollo.mutate({
      mutation: RATE,
      variables: {
        creationId: this.id,
        isPositive: false
      }
    }).subscribe()
  }

}
