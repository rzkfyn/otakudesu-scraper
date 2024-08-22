# Otakudesu Unofficial API

An UNOFFICIAL rest API for [otakudesu](https://otakudesu.lol). Otakudesu is a web that provides anime with Indonesian subtitle.

## Quick Documentation 

| End Point | Method | Params | Description | Example |
| :-- | :-- | :-- | :-- | :-- |
| `/v1/home` | `GET` | `-`  | returns latest ongoing anime update & currently finished anime resources | [`/v1/home`](https://otakudesu-unofficial-api.vercel.app/v1/home) |
| `/v1/ongoing-anime/:page` | `GET` | - `page` (opt, number) | returns ongoing anime resources | [`/v1/ongoing-anime`](https://otakudesu-unofficial-api.vercel.app/v1/ongoing-anime) |
| `/v1/complete-anime/:page` | `GET` | - `page` (opt, number)  | returns finished anime resources | [`/v1/complete-anime/10`](https://otakudesu-unofficial-api.vercel.app/v1/complete-anime/10) |
| `/v1/search/:keyword` | `GET` | - `keyword` (required, string)  | returns anime search results from the given keyword | [`/v1/search/Hibike Euphonium`](https://otakudesu-unofficial-api.vercel.app/v1/search/Hibike%20Euphonium) |
| `/v1/anime/:slug` | `GET` | - `slug` (required, string)  | returns single anime resource | [`/v1/anime/kuzu-honkai-subtitle-indonesia`](https://otakudesu-unofficial-api.vercel.app/v1/anime/kuzu-honkai-subtitle-indonesia) |
| `/v1/anime/:slug/episodes` | `GET` | - `slug` (required, string)  | returns anime episode lists resource (the `/anime/:slug` enpoint's also return the anime episode lists) | [`/v1/anime/kuzu-honkai-subtitle-indonesia/episodes`](https://otakudesu-unofficial-api.vercel.app/v1/anime/kuzu-honkai-subtitle-indonesia/episodes) |
| `/v1/anime/:slug/episodes/:episode` | `GET` | - `slug` (required, string) <br> - `episode` (required, number)  | returns episode resource (with stream url and download urls) | [`/v1/anime/kuzu-honkai-subtitle-indonesia/episodes/1`](https://otakudesu-unofficial-api.vercel.app/v1/anime/kuzu-honkai-subtitle-indonesia/episodes/1) |
| `/v1/episode/:slug` | `GET` | - `slug` (required, string)  | returns single episode data by the episode's slug | [`/v1/episode/kzhnkai-episode-1-sub-indo`](https://otakudesu-unofficial-api.vercel.app/v1/episode/kzhnkai-episode-1-sub-indo) |
| `/v1/genres` | `GET` | - | returns genre lists resource | [`/v1/genres`](https://otakudesu-unofficial-api.vercel.app/v1/genres) |
| `/v1/genres/:slug` | `GET` | - `slug` (required, string)  | returns anime lists by the genre's slug | [`/v1/genres/sports`](https://otakudesu-unofficial-api.vercel.app/v1/genres/sports) |

## Response Example
> response for `/v1/anime/kuzu-honkai-subtitle-indonesia/episodes/1` or `/v1/episode/kzhnkai-episode-1-sub-indo`  
```json5
{
  "status": "Ok",
  "data": {
    "episode": "Kuzu no Honkai Episode 1 Subtitle Indonesia",
    "anime": {
      "slug": "kuzu-honkai-subtitle-indonesia",
      "otakudesu_url": "https://otakudesu.bid/anime/kuzu-honkai-subtitle-indonesia/"
    },
    "has_next_episode": true,
    "next_episode": {
      "slug": "kzhnkai-episode-2-sub-indo",
      "otakudesu_url": "https://otakudesu.bid/episode/kzhnkai-episode-2-sub-indo/"
    },
    "has_previous_episode": false,
    "previous_episode": null,
    "stream_url": "https://desustream.me/playdesu/v2/baru/?id=MnBXN1dwZWEzbHFLNjh4NGt5KzdlRFhtKzlJMnhMSUxQejRMT0hNT3dSRT0=",
    "download_urls": {
      "mp4": [
        {
          "resolution": "360p",
          "urls": [
            {
              "provider": "ZippyShare",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lUMzFEWlpJam9XQkY1ajBwY25zVk9ZcWlIalJnZlk4SzdualMvU2J0T0tCd0k3OFZZdHNsWnpnPT0="
            },
            {
              "provider": "LetsUp",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lJelZPZUp0YitYZ0J0MkZwYjBJVVRMZnlFejNnZExjeUNnaEQvV3FWdmNnQVV5ODhZODVBRWs5bFdBbVMzYkw3NXBBPT0="
            },
            {
              "provider": "Racaty",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lXeVVTTUo5KzhYd1I5MlZoSGpNVWZKSytEazBVUk9nPT0="
            },
            {
              "provider": "Solidfiles",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lUMzFERElNbitXQVZ2bjFWUmpKbElJNmJIbGhnN2VKQ3RrREgwVjUxZGRpMVo="
            },
            {
              "provider": "Mega",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lKelVDTWZjam9IZ2RnbWx3YnZzOWxOUG03b1hSS0NQK1ZzVUxmYUxCOVRDMU13Y3RDa3R4TnhjTVFZVCsyRzZmNDQ5T2tOV3ZrY2QvMWd5aTd3K2FMUnc9PQ=="
            }
          ]
        },
        {
          "resolution": "480p",
          "urls": [
            {
              "provider": "ZippyShare",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lUMzFEWWZkejdRUkZ3aFZGVmpkSUZMNlNGejBGR0djV2hpaVhVV2FNTFlSTU41bzRlcXRCWQ=="
            },
            {
              "provider": "LetsUp",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lJelZPZUp0YitYZ0J0MkZwYjBJVVRMZnlHejNnZExjeUNnaEQvV3FWdmNnQVV5ODhZODVBRWs5bFJER1MzYkw3NXBBPT0="
            },
            {
              "provider": "Racaty",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lXeVVTTUo5KzhYd1I5MlVoTWo5b2ZMcXFKMlFVZk5BPT0="
            },
            {
              "provider": "Solidfiles",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lUMzFERElNbitXQVZ2bjFWUmpKbElJNmJIbGhnSENNMlFuajdlSGFOcFhRc3c="
            },
            {
              "provider": "Mega",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lKelVDTWZjam9IZ2RnbWx3Yng5eHVIcUdyMWxWS0s4VEVnZ0hHZm9wOE1EeFkxY1FEcVlnRTVMQXZjUVdkRWVXKzArdlVTRS9aYzlUNHNncW14ZnlBUnc9PQ=="
            }
          ]
        },
        {
          "resolution": "720p",
          "urls": [
            {
              "provider": "ZippyShare",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lUMzFEWVpvam9XQkY1ajBwY25zVk9ZcWlIalJnZlk1NjhrVG04YWFoS0tCd0k3OFZZdHNsWnpnPT0="
            },
            {
              "provider": "LetsUp",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lJelZPZUp0YitYZ0J0MkZwYjBJVVRMZnlhejNnZExjeUNnaEQvV3FWdmNnQVV5ODhZODVBRWs5bFNCbVMzYkw3NXBBPT0="
            },
            {
              "provider": "Racaty",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lXeVVTTUo5KzhYd1I5MlE5TXo0UkNPYXFaaFUwZUp3PT0="
            },
            {
              "provider": "Solidfiles",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lUMzFERElNbitXQVZ2bjFWUmpKbElJNmJIbGhnT0FwQ1FuaVBWU3MxcWFpc0Y="
            },
            {
              "provider": "Mega",
              "url": "https://desudrive.com/link/?id=eVYzczJaUk9LU0lKelVDTWZjam9IZ2RnbWx3Ym00NUhmS083a1daS091K0QxQkQ5ZkxKb0trZ3U5c1V4dU5odDZOWWRYaVNQS0pmOTMrRFhUMDdaVE5qSHZYK2k4WXVGSEE9PQ=="
            }
          ]
        }
      ],
      "mkv": [ ... ] // 3 items
    }
  }
}
```

### Installation & Configuration
> note: run the command without the `$` symbol

- Open up your terminal, then run this command to clone this repo
```bash
$ git clone https://github.com/rzkfyn/otakudesu-unofficial-api.git
```

- Then cd into the project root directory 
```bash
$ cd otakudesu-unofficial-api
```

- Inside the project root directory, run this command to install all the dependencies
```bash
$ npm install
``` 

- To run a development server, run
```bash
$ npm run dev
```
- The server accessible from a browser on `http://localhost:3000`

Got suggestions or finding bugs and you know how to fix? Pull requests are welcomed.
