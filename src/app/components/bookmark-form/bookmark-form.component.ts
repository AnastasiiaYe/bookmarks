import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '../../constants/constants';
import { AppState } from 'src/app/reducers';
import { BookmarkStorageService } from 'src/app/services/bookmarks-storage.service';
import { CreateBookmark, EditBookmark } from 'src/app/actions';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})

export class BookmarkFormComponent implements OnInit {

  bookmarksSubscription: Subscription;
  bookmarkForm: FormGroup;
  bookmarks: BookmarkModel[] = [];
  bookmark: BookmarkModel;
  state$: Observable<any>;
  mode: 'new' | 'edit' = 'new';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private storageService: BookmarkStorageService
  ) { }

  ngOnInit() {
    this.bookmarksSubscription = this.store
      .select('bookmarks')
      .subscribe(state => {
        this.bookmarks = state.bookmarks as BookmarkModel[];
      });

    this.route.url.subscribe(url => {
      if (url[0]) {
        this.mode = url[0].path === ROUTES.CREATE ? 'new' : 'edit';
      }
    });

    this.route.params.subscribe(params => {
      this.bookmark = this.bookmarks.find(b => b.id === params.id);
    });

    this.formInit(this.mode);
  }

  formInit(mode: 'new' | 'edit') {
    this.bookmarkForm = new FormGroup({
      name: new FormControl(mode === 'new' ? '' : this.bookmark.name, [Validators.required]),
      url: new FormControl(mode === 'new' ? '' : this.bookmark.url, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
      group: new FormControl(mode === 'new' ? '' : this.bookmark.group.name, [Validators.required]),
    });
  }

  onSubmit() {
    this.bookmarkForm.markAllAsTouched();

    if (!this.bookmarkForm.valid) {
      return;
    }

    if (this.mode === 'new') {
      return this.onAdd();
    }

    return this.onSave();
  }

  onAdd() {
    const { name, url, group } = this.bookmarkForm.value;
    this.storageService.addBookmark(name, url, group)
      .subscribe(bookmark => {
        this.store.dispatch(new CreateBookmark(bookmark));
      });
  }

  onSave() {
    this.bookmark.name = this.bookmarkForm.value.name;
    this.bookmark.url = this.bookmarkForm.value.url;
    this.bookmark.group = new GroupModel(this.bookmarkForm.value.group);

    this.storageService.editBookmark(this.bookmark)
      .subscribe((bookmark: BookmarkModel) => {
        this.store.dispatch(new EditBookmark(bookmark));
      });
  }
}
