import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  data: any = {};
  loading = true;
  errors: any;

  leftArticlesCount: any;
  leftArticles?: any[];
  rightArticles?: any[];

  constructor(private apollo: Apollo) { }

  

  ngOnInit(): void {
  console.log('bonjour');

    this.apollo.watchQuery({
      query: gql`
        query Articles {
          articles {
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
      `
    }).valueChanges.subscribe((res: any) => {
      this.data = res?.data?.articles;
      this.loading = res.loading;
      this.errors = res.errors;

      console.log(this.data);

      this.leftArticlesCount = Math.ceil(this.data?.data.length/5);

      this.leftArticles = this.data?.data.slice(0, this.leftArticlesCount);
      
      this.rightArticles = this.data?.data.slice(this.leftArticlesCount, this.data?.data.length);     

    });
  }

}
