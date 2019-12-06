import { Component, OnInit } from '@angular/core';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { DeleteBookmark} from '../../../actions';
import { ROUTES } from '../../../constants/constants';

import { AppState } from '../../../reducers';
import { BookmarkStorageService } from 'src/app/services/bookmarks-storage.service';

@Component({
  selector: 'app-bookmark-details',
  templateUrl: './bookmark-details.component.html',
  styleUrls: ['./bookmark-details.component.scss']
})

export class BookmarkDetailsComponent implements OnInit {

  bookmarks: BookmarkModel[] = [];
  bookmarksSubscription: Subscription;
  state$: Observable<any>;
  bookmark: BookmarkModel;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: BookmarkStorageService
  ) {}

  ngOnInit() {
    this.bookmarksSubscription = this.store
      .select('bookmarks')
      .subscribe(state => {
        this.bookmarks = state.bookmarks as BookmarkModel[];
      });

    this.route.params.subscribe(params => {
      this.bookmark = this.bookmarks.find(b => b.id === params.id);
    });
  }

  onBookmarkEdit() {
    this.router.navigate([ROUTES.EDIT, this.bookmark.id]);
  }

  onBookmarkDelete() {
    this.storageService.deleteBookmark(this.bookmark)
      .subscribe(success => {
        this.store.dispatch(new DeleteBookmark(this.bookmark));
      });
  }
}
