type genre = {
  name: string | undefined,
  slug: string | undefined,
  url: string | undefined
}

type searchResultAnime = {
  title: string | undefined,
  slug: string | undefined,
  poster: string | undefined,
  status: string | undefined,
  rating: string | undefined,
  genres: genre[],
  url: string | undefined
}

export {
  genre, searchResultAnime
}
