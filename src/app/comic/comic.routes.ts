import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import {CreateComponent} from "./components/create/create.component";
import {DetailsComponent} from "./components/details/details.component";

const COMIC_ROUTES: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'comic/:id', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(COMIC_ROUTES)],
  exports: [RouterModule]
})
export class ComicRoutingModule {}
