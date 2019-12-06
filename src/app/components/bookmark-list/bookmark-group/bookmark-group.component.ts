import { Component, OnInit, Input } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { BookmarkModel } from 'src/app/models/bookmark.model';

@Component({
  selector: 'app-bookmark-group',
  templateUrl: './bookmark-group.component.html',
  styleUrls: ['./bookmark-group.component.scss']
})
export class BookmarkGroupComponent implements OnInit {

  @Input() group: GroupModel;
  @Input() bookmarks: BookmarkModel[];

  constructor() { }

  ngOnInit() {
  }

}
