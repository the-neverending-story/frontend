import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CREATION, GetCreationResponse } from '../../../../graphql-types/creation';
import { RATE } from '../../../../graphql-types/rate';

@Component({
  selector: 'app-archive-display-page',
  imports: [],
  templateUrl: './archive-display-page.html',
  styleUrl: './archive-display-page.scss',
})
export class ArchiveDisplayPage implements OnInit {
  private apollo: Apollo = inject(Apollo);
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)

  @Input() id!: string;
  name = '';
  content = '';
  authorUsername = '';
  rating = 0;
  category  = ''

  currentUserVote  = ''

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
        this.ref.detectChanges()
      }
    })
  }

  ratePositive() {
    if(this.currentUserVote === "true") { return; }
    if(this.currentUserVote === "") { this.rating += 1 } else { this.rating += 2 }
    this.currentUserVote = "true"
    this.apollo.mutate({
      mutation: RATE,
      variables: {
        creationId: this.id,
        isPositive: true
      }
    }).subscribe()
  }

  rateNegative() {
    if(this.currentUserVote === "false") { return; }
    if(this.currentUserVote === "") { this.rating -= 1 } else { this.rating -= 2 }
    this.currentUserVote = "false"
    this.apollo.mutate({
      mutation: RATE,
      variables: {
        creationId: this.id,
        isPositive: false
      }
    }).subscribe()
  }

}
