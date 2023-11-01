import { AppState } from "../AppState.js";
import { Collaborator } from "../models/Collaborator.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CollaboratorsService {
  async collaborateOnAlbum(albumId) {
    const albumData = { albumId: albumId };
    const res = await api.post("api/collaborators", { albumId });
    logger.log("[COOLAB ON ALBUM]", res.data);
    AppState.collaborators.push(new Collaborator(res.data));
  }

  async getCollaboratorsOnAlbum(albumId) {
    const res = await api.get(`/api/albums/${albumId}/collaborators`);
    logger.log("[GET COLLABS]", res.data);
    AppState.collaborators = res.data.map(
      (collaborator) => new Collaborator(collaborator)
    );
  }
}

export const collaboratorsService = new CollaboratorsService();
