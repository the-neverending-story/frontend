import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-main-menu',
  imports: [],
  providers: [Apollo],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss'
})
export class MainMenu implements OnInit {
  constructor(private readonly apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            user(id: 1) {
              id
              username
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
  }
}
