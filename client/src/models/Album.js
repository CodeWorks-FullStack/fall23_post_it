export class Album {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.archived = data.archived;
    this.coverImg = data.coverImg;
    this.creatorId = data.creatorId;
    this.creator = data.creator;
  }
}

const album = {
  _id: "653ff380a1ab3843ad1ff0bc",
  title: "Aesthetics",
  category: "misc",
  archived: false,
  coverImg:
    "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
  creatorId: "653fe97d74cfd7fa3268ddc0",
  createdAt: "2023-10-30T18:18:40.683Z",
  updatedAt: "2023-10-30T18:18:40.683Z",
  __v: 0,
  creator: {
    _id: "653fe97d74cfd7fa3268ddc0",
    name: "cutepug",
    picture:
      "https://s.gravatar.com/avatar/659e67c8b8597c7732c17927b9510e39?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fcu.png",
    id: "653fe97d74cfd7fa3268ddc0",
  },
  id: "653ff380a1ab3843ad1ff0bc",
};
