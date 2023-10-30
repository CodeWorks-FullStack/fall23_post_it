import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class AlbumsService {
  async getAlbums(query) {
    // const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    const albums = await dbContext.Albums.find(query).populate('creator', 'name picture')
    return albums
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')
    if (!album) {
      throw new BadRequest(`${albumId} is not a valid album ID`)
    }
    return album
  }
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }
  async archiveAlbum(albumId, userId) {
    const album = await this.getAlbumById(albumId)
    if (album.creatorId.toString() != userId) {
      throw new Forbidden("NOT YOUR ALBUM TO ARCHIVE")
    }
    // album.archived = true
    album.archived = !album.archived
    await album.save()
    return album
  }
}

export const albumsService = new AlbumsService()