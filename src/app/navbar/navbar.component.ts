import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Subscription } from "rxjs";
// import * as varaible from "../apollo/queries/category/categories"


// import CATEGORIES_QUERY from "../apollo/queries/category/categories";

// declare const CATEGORIES_QUERY: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

//   CATEGORIES_QUERY = gql`
//     query {
//       categories {
//         data {
//           attributes {
//             name
//           }
//         }
//       }
//     }
// `;
   

  data: any = {};
  loading = true;
  errors: any;

  private queryCategories!: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
        query: gql`
          query Categories {
            categories {
              data {
                id, 
                attributes {
                  name
                }
              }
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        this.data = result?.data?.categories;
        this.loading = result.loading;
        this.errors = result.error;
      });
  }

  ngOnDestroy() {
    this.queryCategories.unsubscribe();
  } 
}
