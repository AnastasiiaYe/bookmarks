import { Injectable } from '@angular/core';
import { BookmarkModel } from '../models/bookmark.model';
import { LOCAL_STORAGE } from '../constants/constants';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as uuid from 'uuid';
import { GroupModel } from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class BookmarkStorageService {

    private _bookmarks: BookmarkModel[];

    constructor(private store: Store<AppState>) {

        this.store
            .select('bookmarks')
            .subscribe(state => {
                this._bookmarks = [...state.bookmarks as BookmarkModel[]];
            });
    }

    /**** GETTERS | START ****/

    get bookmarks(): BookmarkModel[] { return [...this._bookmarks]; }

    /**** GETTERS | END ****/
    /**** DATA MANIPULATION | START ****/

    public fetchBookmarks(): Observable<BookmarkModel[]> {
        // In reality might be asynchronious operation
        return of(this.readBookmarksFormLocalStorage());
    }

    public addBookmark(name, url, group): Observable<BookmarkModel>  {
        // In reality might be asynchronious operation
        const bookmark = new BookmarkModel(uuid.v4(), new GroupModel(group), name, url);
        this._bookmarks.push(bookmark);
        this.writeBookmarksToLocalStorage(this._bookmarks);
        return of(bookmark);
    }

    public editBookmark(bookmark: BookmarkModel): Observable<BookmarkModel> {
        // In reality might be asynchronious operation
        const index = this._bookmarks.indexOf(bookmark);
        if (index !== -1) {
            this._bookmarks[index] = bookmark;
            this.writeBookmarksToLocalStorage(this._bookmarks);
            return of(bookmark);
        }

        // error handler would be added
    }

    public deleteBookmark(bookmark: BookmarkModel): Observable<boolean> {
        // In reality might be asynchronious operation
        const index = this._bookmarks.indexOf(bookmark);
        if (index !== -1) {
            this._bookmarks.splice(index, 1);
            return of(this.writeBookmarksToLocalStorage(this._bookmarks));
        }

        return of(false);
    }
    /**** DATA MANIPULATION | END ****/
    /**** LOCAL STORAGE | START ****/

    private readBookmarksFormLocalStorage(): BookmarkModel[] {
        try {
            // Also, validation if each element is BookmarkModel could be added
            const localStorageBookmarks = JSON.parse(localStorage.getItem(LOCAL_STORAGE.BOOKMARKS));
            return localStorageBookmarks ? localStorageBookmarks : [];
        } catch {
            console.log('We are here');
            return [];
        }
    }

    private writeBookmarksToLocalStorage(bookmarks: BookmarkModel[]): boolean {
        try {
            localStorage.setItem(LOCAL_STORAGE.BOOKMARKS, JSON.stringify(bookmarks));
            return true;
        } catch {
            return false;
        }
    }

    /**** LOCAL STORAGE | END ****/

}
