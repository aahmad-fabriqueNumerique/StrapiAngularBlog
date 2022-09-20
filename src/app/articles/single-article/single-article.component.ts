import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MarkdownService } from 'ngx-markdown';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css'],
})
export class SingleArticleComponent implements OnInit {
  constructor(private apollo: Apollo, private route: ActivatedRoute, private markdownService: MarkdownService ) {}

  data: any = {};
  id: any;
  image: any;
  title: any;
  content: any;
  loading = true;
  errors: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');

      this.apollo
        .watchQuery({
          query: gql`
            query SingleArticle($id: ID!) {
              article(id: $id) {
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
            id: this.route.snapshot.paramMap.get('id'),
                       
          },
        })
        .valueChanges.subscribe((res) => {
          this.data = res.data;
          this.id = this.data.article.data.id;

          this.image =
            this.data?.article.data.attributes.image?.data?.attributes?.url;
          this.title = this.data?.article.data.attributes.Title;
          this.content = this.markdownService.parse(this.data?.article.data.attributes.ContentText);
          
          // this.content = 
          // `## Markdown __rulez__!
          //   ---

          //   ### Syntax highlight
          //   \`\`\`typescript
          //   const language = 'typescript';
          //   \`\`\`

          //   ### Lists
          //   1. Ordered list
          //   2. Another bullet point
          //     - Unordered list
          //     - Another unordered bullet

          //   ### Blockquote
          //   > Blockquote to the max`;
          this.loading = res.loading;
          this.errors = res.errors;

          console.log('coco',this.id);
        });
    });
  }
}
