import { Component, OnInit, Input } from '@angular/core';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { Router } from '@angular/router';
import { ROUTES } from '../../../constants/constants';

@Component({
  selector: 'app-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.scss']
})

export class BookmarkItemComponent implements OnInit {

  @Input() bookmark: BookmarkModel;

  constructor(private router: Router) { }

  ngOnInit() { }

  openBookmarkDetails() {
    this.router.navigate([ROUTES.DETAILS, this.bookmark.id]);
  }
}
