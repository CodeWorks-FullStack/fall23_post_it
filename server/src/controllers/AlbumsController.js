import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PicturesService.js";
import { collaboratorsService } from "../services/CollaboratorsService.js";

export class AlbumsController extends BaseController {
  constructor () {
    super('api/albums')
    this.router
      .get('', this.getAlbums)
      .get('/:albumId', this.getAlbumById)
      .get('/:albumId/pictures', this.getPicturesByAlbumId)
      .get('/:albumId/collaborators', this.getCollaboratorsByAlbumId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
  }


  async getAlbums(request, response, next) {
    try {
      const query = request.query
      const albums = await albumsService.getAlbums(query)
      return response.send(albums)
    } catch (error) {
      next(error)
    }
  }
  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      return response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getPicturesByAlbumId(request, response, next) {
    try {
      const albumId = request.params.albumId
      const pictures = await picturesService.getPicturesByAlbumId(albumId)
      return response.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getCollaboratorsByAlbumId(request, response, next) {
    try {
      const albumId = request.params.albumId
      const collaborators = await collaboratorsService.getCollaboratorsByAlbumId(albumId)
      return response.send(collaborators)
    } catch (error) {
      next(error)
    }
  }

  async createAlbum(request, response, next) {
    try {
      const albumData = request.body
      const userId = request.userInfo.id
      albumData.creatorId = userId
      const album = await albumsService.createAlbum(albumData)
      return response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const userId = request.userInfo.id
      const album = await albumsService.archiveAlbum(albumId, userId)
      return response.send(album)
    } catch (error) {
      next(error)
    }
  }
}