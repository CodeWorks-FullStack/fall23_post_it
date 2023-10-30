import { dbContext } from "../db/DbContext.js"

class AlbumsService {
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator')
    return album
  }
}

export const albumsService = new AlbumsService()