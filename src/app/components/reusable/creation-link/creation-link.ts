import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Creation } from '../../../../graphql-types/creation';

@Component({
  selector: 'app-creation-link',
  imports: [RouterLink],
  templateUrl: './creation-link.html',
  styleUrl: './creation-link.scss',
})
export class CreationLink {
  creation = input<Creation>({
    id: '',
    created_at: '',
    name: '',
    category: '',
    author_username: '',
    rating: 0,
    content: '',
    relations: [],
    is_canon: false
  })

  isInVotingPhase = input<boolean>(false);

  getCreationDate() {
    return new Intl.DateTimeFormat('en-US').format(Number(this.creation().created_at ?? 0));
  }
}
