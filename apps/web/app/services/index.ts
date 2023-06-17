import { fullUrl, seasonNumber } from '../const'

export async function getSeries() {
  const response = await fetch(fullUrl)
  return await response.json()
}

export async function fetchEpisodiesFromSeason() {
  const response = await fetch(`${fullUrl}&Season=${seasonNumber}`)
  return await response.json()
}

export async function fetchEpisodeDetails(session: string[]) {
  const url = `${fullUrl}&Season=${seasonNumber}`
  const urls = session.map((episodeNumber) => `${url}&Episode=${episodeNumber}`)

  return Promise.all(
    urls.map(async (url) => {
      const resp = await fetch(url)
      return resp.json()
    })
  )
}
