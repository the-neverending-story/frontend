import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Creation } from '../../../../graphql-types/creation';
import { GET_VOTEABLE, GetVoteableResponse } from '../../../../graphql-types/creation';
import { Apollo } from 'apollo-angular';
import { CreationLink } from '../../reusable/creation-link/creation-link';


@Component({
  selector: 'app-vote-page',
  imports: [CreationLink],
  templateUrl: './vote-page.html',
  styleUrl: './vote-page.scss',
})
export class VotePage implements OnInit {
  private apollo: Apollo = inject(Apollo);
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)
  
  stories: Creation[] = [];
  characters: Creation[] = [];
  concepts: Creation[] = [];
  locations: Creation[] = [];
  isLoaded = false;

  ngOnInit() {
    this.apollo.query<GetVoteableResponse>({
      query: GET_VOTEABLE
    }).subscribe(({ data }) => {
      this.isLoaded = true;
      this.stories = data!.stories;
      this.characters = data!.characters;
      this.concepts = data!.concepts;
      this.locations = data!.locations;
      this.ref.detectChanges();
    })
  }

}
