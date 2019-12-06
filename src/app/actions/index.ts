import { Action } from '@ngrx/store';
import { BookmarkModel } from '../models/bookmark.model';

export const CREATE_BOOKMARK = '[Bookmark Page] CreateBookmark';
export const DELETE_BOOKMARK = '[Bookmark Page] DeleteBookmark';
export const EDIT_BOOKMARK = '[Bookmark Page] EditBookmark';
export const FETCH_BOOKMARKS = '[Bookmark Page] FetchBookmarks';

export class CreateBookmark implements Action {
    readonly type = '[Bookmark Page] CreateBookmark';

    constructor(public bookmark: BookmarkModel) {}
}

export class DeleteBookmark implements Action {
    readonly type = '[Bookmark Page] DeleteBookmark';

    constructor(public bookmark: BookmarkModel ) {}
}

export class EditBookmark implements Action {
    readonly type = '[Bookmark Page] EditBookmark';

    constructor(public bookmark: BookmarkModel) {}
}

export class FetchBookmarks implements Action {
    readonly type = '[Bookmark Page] FetchBookmarks';

    constructor(public bookmarks: BookmarkModel[]) {}
}

export type actions =
  | CreateBookmark
  | DeleteBookmark
  | EditBookmark
  | FetchBookmarks;
