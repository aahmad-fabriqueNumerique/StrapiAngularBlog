import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles/articles.component';
import { SingleArticleComponent } from './articles/single-article/single-article.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: "", component: ArticlesComponent },
  { path: "articles/:id", component: SingleArticleComponent },
  { path: "category/:id", component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
