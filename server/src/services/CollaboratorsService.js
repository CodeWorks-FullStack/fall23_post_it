import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class CollaboratorsService {
  async destroyCollaborator(collaboratorId, userId) {
    const collaborator = await dbContext.Collaborators.findById(collaboratorId)

    if (!collaborator) {
      throw new BadRequest(`${collaboratorId} is not a valid ID`)
    }


    if (collaborator.accountId.toString() != userId) {
      throw new Forbidden("NOT YOUR DATA")
    }

    await collaborator.delete()
    return "COLLABORATION ENDED, BIG DAWG"
  }
  async createCollaborator(collaboratorData) {
    const album = await albumsService.getAlbumById(collaboratorData.albumId)

    if (album.archived) {
      throw new Forbidden(`${album.title} HAS BEEN ARCHIVED, OKAY`)
    }

    const collaborator = await dbContext.Collaborators.create(collaboratorData)
    await collaborator.populate('profile', 'name picture')
    await collaborator.populate('album')
    return collaborator
  }
  async getCollaboratorsByAlbumId(albumId) {
    const collaborators = await dbContext.Collaborators.find({ albumId: albumId })
      .populate('profile', 'name picture')
    return collaborators
  }
  async getMyAlbumCollaborations(userId) {
    const collaborations = await dbContext.Collaborators.find({ accountId: userId })
      .populate({
        path: 'album',
        populate: {
          path: 'memberCount'
        }
      })
    // .populate('album')
    return collaborations
  }
}

export const collaboratorsService = new CollaboratorsService()