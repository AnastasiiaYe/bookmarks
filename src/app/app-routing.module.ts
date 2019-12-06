import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from './constants/constants';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkDetailsComponent } from './components/bookmark-list/bookmark-details/bookmark-details.component';


const routes: Routes = [
  { path: ROUTES.CREATE, component: BookmarkFormComponent },
  { path: `${ROUTES.EDIT}:id`, component: BookmarkFormComponent },
  { path: `${ROUTES.DETAILS}:id`, component: BookmarkDetailsComponent },
  { path: ROUTES.ROOT, component: BookmarkFormComponent },
  { path: '**', redirectTo: ROUTES.CREATE }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
