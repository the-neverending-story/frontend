import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PROFILE, GetProfileResponse, UPDATE_USER } from '../../../../graphql-types/user';
import { Creation } from '../../../../graphql-types/creation';
import { CreationLink } from '../../reusable/creation-link/creation-link';

@Component({
  selector: 'app-profile-page',
  imports: [CreationLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private apollo: Apollo = inject(Apollo);
  private ref: ChangeDetectorRef = inject(ChangeDetectorRef)

  @Input() username!: string;

  loading = true;

  joinDate = "2026/01/01";
  totalCreations = 0;
  totalLikes = 0;
  totalCanonized = 0;
  icon = 'https://amiamour.com/wp-content/uploads/2025/09/Hornet-SilkSong.jpg'
  creations: Creation[] = []
  userBio = ''

  bioReadOnly = true;
  
  ngOnInit() {
    this.apollo.query<GetProfileResponse>({
      query: GET_PROFILE,
      variables: {
        username: this.username
      }
    }).subscribe(({ data }) => {
      this.loading = false;
      this.joinDate = new Intl.DateTimeFormat('en-US').format(Number(data!.getUser.created_at));
      this.userBio = data!.getUser.bio
      this.creations = data!.getCreations
      this.totalCreations = data!.getCreations.length
      this.totalLikes = data!.getCreations.reduce<number>((a, c) => {
        return a + c.rating
      }, 0)
      this.totalCanonized = data!.getCreations.reduce<number>((a, c) => {
        return a + Number(c.is_canon)
      }, 0)
      this.ref.detectChanges()
    })
  }

  setBioReadOnly(state: boolean) {
    if(JSON.parse(localStorage.getItem('user_data') ?? '')?.username === this.username) {
      this.bioReadOnly = state
    }
  }

  editBio(e: KeyboardEvent) {
    let target = e.currentTarget as HTMLTextAreaElement
    if(e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.bioReadOnly = true
      this.apollo.mutate({
        mutation: UPDATE_USER,
        variables: {
          bio: target.value
        }
      }).subscribe()
    }
  }
}
