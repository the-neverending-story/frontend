import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'main-menu',
  imports: [],
  providers: [Apollo],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss'
})
export class MainMenu {
  //constructor(private readonly apollo: Apollo) {}

  // ngOnInit() {
  //   this.apollo
  //     .watchQuery({
  //       query: gql`
  //         {
  //           user(username: "asdfca123") {
  //             id
  //             username
  //           }
  //         }
  //       `,
  //     })
  //     .valueChanges.subscribe((result: any) => {
  //       console.log(result);
  //     });
  // }
}
