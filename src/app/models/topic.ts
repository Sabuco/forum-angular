export class Topic {
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