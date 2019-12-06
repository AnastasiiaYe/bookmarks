import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { GroupModel } from 'src/app/models/group.model';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/constants';
import { Store } from '@ngrx/store';
import {  Subscription } from 'rxjs';

import { AppState } from '../../reducers';
import { BookmarkStorageService } from 'src/app/services/bookmarks-storage.service';
import { FetchBookmarks } from 'src/app/actions';

export interface FeatureState {
  bookmarks: BookmarkModel[];
}

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit, OnDestroy {

  panelOpenState = false;
  bookmarks: BookmarkModel[] = [];
  bookmarksSubscription: Subscription;
  groups: GroupModel[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private storageService: BookmarkStorageService) { }


  ngOnInit() {
    this.bookmarksSubscription = this.store
    .select('bookmarks')
    .subscribe(state => {
      this.bookmarks = state.bookmarks as BookmarkModel[];
      this.groups = [];

      new Set(this.bookmarks.map(b => b.group.name)).forEach(item => this.groups.push(new GroupModel(item)));
    });
    this.storageService.fetchBookmarks()
      .subscribe((bookmarks) => {
        console.log(bookmarks);
        this.store.dispatch(new FetchBookmarks(bookmarks));
      });
  }

  ngOnDestroy() {
    this.bookmarksSubscription.unsubscribe();
  }

  getBookmarksForGroup(group: GroupModel) {
    return this.bookmarks.filter(b => b.group.name === group.name);
  }

  addNewBookmark() {
    this.router.navigate([ROUTES.CREATE]);
  }
}