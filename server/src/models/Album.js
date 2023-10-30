import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 50 },
    category: { type: String, enum: ['cats', 'dogs', 'games', 'gachamon', 'animals', 'misc'], required: true, default: 'misc' },
    archived: { type: Boolean, required: true, default: false },
    coverImg: { type: String, required: true, maxLength: 300 },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})