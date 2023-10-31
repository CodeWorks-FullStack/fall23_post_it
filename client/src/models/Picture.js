export class Picture {
  constructor(data) {
    this.id = data.id;
    this.imgUrl = data.imgUrl;
    this.albumId = data.albumId;
    this.creatorId = data.creatorId;
    this.creator = data.creator;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
  }
}

const picture = {
  _id: "65413499691eb372409f87c7",
  imgUrl:
    "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  albumId: "65413499691eb372409f87c3",
  creatorId: "653fe97d74cfd7fa3268ddc0",
  createdAt: "2023-10-31T17:08:41.715Z",
  updatedAt: "2023-10-31T17:08:41.715Z",
  __v: 0,
  creator: {
    _id: "653fe97d74cfd7fa3268ddc0",
    name: "cutepug",
    picture:
      "https://s.gravatar.com/avatar/659e67c8b8597c7732c17927b9510e39?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fcu.png",
    id: "653fe97d74cfd7fa3268ddc0",
  },
  id: "65413499691eb372409f87c7",
};
