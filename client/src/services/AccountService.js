import { AppState } from "../AppState";
import { Account } from "../models/Account.js";
import { Collaborator } from "../models/Collaborator.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class AccountService {
  async getAccount() {
    try {
      const res = await api.get("/account");
      AppState.account = new Account(res.data);
    } catch (err) {
      logger.error("HAVE YOU STARTED YOUR SERVER YET???", err);
    }
  }

  async getCollabAlbums() {
    const res = await api.get("/account/collaborators");
    logger.log("GET COLLAB ALBUMS", res.data);
    AppState.myCollaboratedAlbum = res.data.map(
      (collab) => new Collaborator(collab)
    );
  }
}

export const accountService = new AccountService();
