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

type ongoingAnime = {
  title: string | undefined,
  slug: string | undefined,
  poster: string | undefined,
  currentEpisode: string | undefined,
  releaseDay: string | undefined,
  newestReleaseDate: string | undefined,
  url: string | undefined
}

export {
  genre, 
  searchResultAnime,
  ongoingAnime
}
