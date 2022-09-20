import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})


export class CategoryComponent implements OnInit {

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  data: any = {};
  category: any = {};
  loading = true;
  errors: any;
  leftArticlesCount: any;
  leftArticles?: any[];
  rightArticles?: any[];
  dataID: any;
  queryCategorie: any;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.dataID = params.get('id');

      this.queryCategorie = this.apollo.watchQuery({
          query: gql`
            query Category($id: ID!) {
              category(id: $id) {
                data {
                  id
                  attributes {
                    category {
                      data {
                        attributes {
                          name
                        }
                      }
                    }
                    Title
                    createdAt
                    ReadingTime
                    Description
                    ContentText
                    image {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            id: this.dataID
          },
        })
        .valueChanges.subscribe((res) => {
          this.data = res.data;

          this.category = this.data.categorie.data.attributes.name
          this.leftArticlesCount = Math.ceil(this.data?.categorie.data.attributes.articles.data.length / 5);
  
          this.leftArticles = this.data?.categorie.data.attributes.articles.data.slice(0, this.leftArticlesCount);
          this.rightArticles = this.data?.categorie.data.attributes.articles.data.slice(
            this.leftArticlesCount,
            this.data?.categorie.data.attributes.articles.data.length
          );
  
          this.loading = res.loading;
          this.errors = res.errors;
        });
    });
  }

  ngOnDestroy() {
    this.queryCategorie.unsubscribe();
  }

}
