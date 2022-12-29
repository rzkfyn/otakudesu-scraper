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
  current_episode: string | undefined,
  release_day: string | undefined,
  newest_release_date: string | undefined,
  otakudesu_url: string | undefined
}

type completeAnime = {
  title: string | undefined,
  slug: string | undefined,
  poster: string | undefined,
  episode_count: string | undefined,
  rating: string | undefined,
  last_release_date: string | undefined,
  otakudesu_url: string | undefined
}

export {
  genre, 
  searchResultAnime,
  ongoingAnime,
  completeAnime
}
