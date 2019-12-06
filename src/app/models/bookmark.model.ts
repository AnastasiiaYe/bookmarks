import { GroupModel } from './group.model';

export class BookmarkModel {
    constructor(
        public id: string,
        public group: GroupModel,
        public name: string,
        public url: string
    ) { }
}
