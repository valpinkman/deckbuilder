export const SCRYFALL_API_BASE = 'https://api.scryfall.com/cards'
export type SCRYFALL_API_BASE = typeof SCRYFALL_API_BASE

export const searchCardUrl = (term: string): string =>
  `${SCRYFALL_API_BASE}/search?q=${encodeURIComponent(term)}`
