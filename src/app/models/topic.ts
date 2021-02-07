import { Comment } from "./comment";

export class Topic {
    _id(token: any, comment: Comment, _id: any) {
      throw new Error('Method not implemented.');
    }
    constructor(
        public title: String,
        public content: String,
        public code: String,
        public lang: String,
        public date: String,
        public user: any,
        public comments: any
    ){}
}