import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkGroupComponent } from './components/bookmark-list/bookmark-group/bookmark-group.component';
import { BookmarkItemComponent } from './components/bookmark-list/bookmark-item/bookmark-item.component';
import { BookmarkDetailsComponent } from './components/bookmark-list/bookmark-details/bookmark-details.component';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';

/****  Angular material ****/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';

/****  Testing ****/
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkListComponent,
    BookmarkGroupComponent,
    BookmarkItemComponent,
    BookmarkDetailsComponent,
    BookmarkFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer),
    BrowserAnimationsModule,
    AngularMaterialModule,
    /****  Testing ****/
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
