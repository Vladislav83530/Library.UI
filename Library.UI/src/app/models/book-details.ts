export interface IBookDetails {
  id: number,
  title: string,
  author: string,
  cover: string,
  genre: string,
  content: string,
  rating?: number,
  reviews?: [
    {
      id: number,
      message: string,
      reviewer: string
    }
  ]
}
