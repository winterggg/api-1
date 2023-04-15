import IAuthor from "./IAuthor"

interface INote {
  id: string
  createdAt: string
  content: string
  favoriteCount: number
  author: IAuthor
}

export default INote
