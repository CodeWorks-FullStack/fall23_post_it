import { AppState } from "../AppState.js";
import { Album } from "../models/Album.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class AlbumsService {
  async getAlbums() {
    const res = await api.get("api/albums");
    logger.log("[ALBUMS SERVICE] getAlbums() => res.data:", res.data);
    AppState.albums = res.data.map((album) => new Album(album));
  }
  async getAlbumById(albumId) {
    AppState.activeAlbum = null;
    const res = await api.get(`api/albums/${albumId}`);
    logger.log("[ALBUMS SERVICE] getALbumsById() -> res.data", res.data);
    AppState.activeAlbum = new Album(res.data);
  }

  async createAlbum(albumData) {
    const res = await api.post(`api/albums`, albumData);
    logger.log("[ALBUMS SERVICE] createAlbum => res.data:", res.data);
    AppState.albums.push(new Album(res.data));
  }

  async destroyAlbum(albumId) {
    const res = await api.delete(`api/albums/${albumId}`);
    logger.log("[ALBUMS SERVICE] destroyAlbum() -> res.data:", res.data);
    AppState.activeAlbum = new Album(res.data);
  }
}

export const albumsService = new AlbumsService();
