import { Album } from "./Album.js";

export class Collaborator {
  constructor(data) {
    this.id = data.id;
    this.accountId = data.accountId;
    this.albumId = data.albumId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.profile = data.profile;
    this.album = data.album ? new Album(data.album) : null;
  }
}

const collaborator = {
  albumId: "6541c455a75928b1d6064308",
  accountId: "65301af36ccaa872fc2069bc",
  _id: "65426fb3b72d8d1a9d6ed3aa",
  createdAt: "2023-11-01T15:33:07.606Z",
  updatedAt: "2023-11-01T15:33:07.606Z",
  __v: 0,
  album: {
    _id: "6541c455a75928b1d6064308",
    title: "Pokemon",
    category: "gachamon",
    archived: false,
    coverImg:
      "https://cdnb.artstation.com/p/assets/images/images/039/879/895/large/kieran-ritchie-pokeball3.jpg?1627228784",
    creatorId: "65301af36ccaa872fc2069bc",
    createdAt: "2023-11-01T03:21:57.789Z",
    updatedAt: "2023-11-01T03:21:57.789Z",
    __v: 0,
    id: "6541c455a75928b1d6064308",
  },
  profile: {
    _id: "65301af36ccaa872fc2069bc",
    name: "samurmairu",
    picture:
      "https://s.gravatar.com/avatar/9ba60ff35c57c19c35bf572402b3ace8?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsa.png",
    id: "65301af36ccaa872fc2069bc",
  },
  id: "65426fb3b72d8d1a9d6ed3aa",
};
