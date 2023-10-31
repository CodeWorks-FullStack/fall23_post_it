import { dbContext } from "../db/DbContext.js"

class PicturesService {
  async createPicture(pictureData) {
    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    return picture
  }
  async getPicturesByAlbumId(albumId) {
    // const pictures = await dbContext.Pictures.find({ albumId })
    const pictures = await dbContext.Pictures.find({ albumId: albumId })
      .populate('creator', 'name picture')
    return pictures
  }
}

export const picturesService = new PicturesService()