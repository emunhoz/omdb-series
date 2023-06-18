import { fullUrl, seasonNumber } from '../const'

export async function getSeries() {
  const response = await fetch(fullUrl)
  return await response.json()
}

export async function fetchEpisodiesFromSeason() {
  const response = await fetch(`${fullUrl}&Season=${seasonNumber}`)
  return await response.json()
}

export async function fetchEpisodeByNumber(episode: string) {
  const url = `${fullUrl}&Season=${seasonNumber}&Episode=${episode}`

  const resp = await fetch(url)
  return resp.json()
}
