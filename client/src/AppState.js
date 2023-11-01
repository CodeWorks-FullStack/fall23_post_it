import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Album.js').Album[]} */
  albums: [],
  /** @type {import('./models/Album.js').Album | null} */
  activeAlbum: null,
  /** @type {import('./models/Picture.js').Picture[]} */
  pictures: [],
  /** @type {import('./models/Collaborator.js').Collaborator[]} */
  collaborators: [],
  /** @type {import('./models/Collaborator.js').Collaborator[]} */
  myCollaboratedAlbum: [],
});
