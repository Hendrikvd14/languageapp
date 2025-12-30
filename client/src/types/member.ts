export type Member = {
  id: string
  dateOfBirth: string
  imageUrl: string
  displayName: string
  created: string
  lastActive: string
  gender: string
  description: string
  city: string
  country: string
  decks: Deck[]
}
export type Deck = {
  id: number
  name: string
  sourceLanguage: string
  targetLanguage: string
}

export type Card = {
  id: number
  front: string
  back: string
  exampleSentence: string
}