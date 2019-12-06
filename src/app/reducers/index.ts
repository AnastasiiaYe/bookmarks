import { ActionReducerMap } from '@ngrx/store';
import { BookmarkModel } from '../models/bookmark.model';
import * as Actions from '../actions';

export interface AppState {
  bookmarks: BookmarksState;
}

export interface BookmarksState {
  bookmarks: BookmarkModel[];
}

export const initialState = {
   bookmarks: []
};

export function bookmarksReducer(state: BookmarksState = initialState, action: Actions.actions ) {
  switch (action.type) {
    case Actions.CREATE_BOOKMARK:
      const addBookmark = [...state.bookmarks];
      addBookmark.push(action.bookmark);

      return {
        ...state,
        bookmarks: [...addBookmark]
      };
    case Actions.DELETE_BOOKMARK:
      const updateBookmarks = [...state.bookmarks];
      updateBookmarks.splice(updateBookmarks.indexOf(action.bookmark), 1);

      return {
        ...state,
        bookmarks: [...updateBookmarks]
      };
    case Actions.EDIT_BOOKMARK:
      const editedBookmarks = [...state.bookmarks];
      editedBookmarks.forEach(b => b = b.id === action.bookmark.id ? action.bookmark : b);

      return {
        ...state,
        bookmarks: [...editedBookmarks]
      };
    case Actions.FETCH_BOOKMARKS:
      const fetchedBookmarks = [...action.bookmarks];
      return {
        ...state,
        bookmarks: [...fetchedBookmarks]
      };
    default:
      return state;
  }
}

export const rootReducer: ActionReducerMap<AppState> = {
  bookmarks: bookmarksReducer,
};
