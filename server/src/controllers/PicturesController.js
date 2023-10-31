import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PicturesService.js";
import { response } from "express";

export class PicturesController extends BaseController {
  constructor () {
    super('api/pictures')
    this.router
      // NOTE not gonna work
      // .get('/:albumId/pictures')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)
  }
  async createPicture(request, response, next) {
    try {
      const pictureData = request.body
      const userId = request.userInfo.id
      pictureData.creatorId = userId
      const picture = await picturesService.createPicture(pictureData)
      return response.send(picture)
    } catch (error) {
      next(error)
    }
  }
}