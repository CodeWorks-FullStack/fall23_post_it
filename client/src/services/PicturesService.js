import { AppState } from "../AppState.js";
import { Picture } from "../models/Picture.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PicturesService {
  async getPicturesByAlbumId(albumId) {
    const res = await api.get(`api/albums/${albumId}/pictures`);
    logger.log("[PICTURES SERVICE] getPicturesByAlbumId:", res.data);
    AppState.pictures = res.data.map((picture) => new Picture(picture));
  }

  async createPicture(pictureData) {
    const res = await api.post("api/pictures", pictureData);
    logger.log("[PICTURES SERVICE] createPicture()", res.data);
    AppState.pictures.push(new Picture(res.data));
  }
}

export const picturesService = new PicturesService();
