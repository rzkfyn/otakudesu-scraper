type anime = {
  title: string | undefined;
  japanese_title: string | undefined;
  poster: string | undefined;
  rating: string | undefined;
  produser: string | undefined;
  type: string | undefined;
  status: string | undefined;
  episode_count: string | undefined;
  duration: string | undefined;
  release_date: string | undefined;
  studio: string | undefined;
  genres: genre[];
  synopsis: string | undefined;
  batch: {
    slug: string | undefined;
    otakudesu_url: string | undefined;
    uploaded_at: string | undefined;
  } | null;
  episode_lists: episode_list[];
  recommendations: {
    title: string | undefined;
    slug: string | undefined;
    poster: string | undefined;
    otakudesu_url: string | undefined;
  }[];
};

type searchResultAnime = {
  title: string | undefined;
  slug: string | undefined;
  poster: string | undefined;
  status: string | undefined;
  rating: string | undefined;
  genres: genre[];
  url: string | undefined;
};

type ongoingAnime = {
  title: string | undefined;
  slug: string | undefined;
  poster: string | undefined;
  current_episode: string | undefined;
  release_day: string | undefined;
  newest_release_date: string | undefined;
  otakudesu_url: string | undefined;
};

type completeAnime = {
  title: string | undefined;
  slug: string | undefined;
  poster: string | undefined;
  episode_count: string | undefined;
  rating: string | undefined;
  last_release_date: string | undefined;
  otakudesu_url: string | undefined;
};

type genre = {
  name: string | undefined;
  slug: string | undefined;
  otakudesu_url: string | undefined;
};

type episode_list = {
  episode: string | undefined;
  slug: string | undefined;
  otakudesu_url: string | undefined
};

type episode = {
  episode: string;
  anime: {
    slug: string | undefined;
    otakudesu_url: string | undefined;
  };
  has_next_episode: boolean;
  next_episode: {
    slug: string | undefined;
    otakudesu_url: string | undefined;
  } | null;
  has_previous_episode: boolean;
  previous_episode: {
    slug: string | undefined;
    otakudesu_url: string | undefined;
  } | null;
  stream_url: string | undefined;
  download_urls: {
    mp4: {
      resolution: string | undefined;
      urls: {
        provider: string | undefined;
        url: string | undefined;
      }[];
    }[];
    mkv: {
      resolution: string | undefined;
      urls: {
        provider: string | undefined;
        url: string | undefined;
      }[];
    }[];
  };
};

type batch = {
  batch: string | undefined;
  download_urls: {
    resolution: string | undefined;
    file_size: string | undefined;
    urls: {
      provider: string | undefined;
      url: string | undefined;
    }[];
  }[];
}

export {
  anime,
  searchResultAnime,
  ongoingAnime,
  completeAnime,
  genre,
  episode_list,
  episode,
  batch
};
