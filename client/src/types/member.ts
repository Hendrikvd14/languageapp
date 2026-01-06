/* export type Member = {
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
  memberDecks: Deck[]
} */
export type Member = {
  id: string
  displayName: string
  decks: MemberDeckDto[]
}
export type Deck = {
  id: number
  name: string
  sourceLanguage: string
  targetLanguage: string
} 

export type MemberDeckDto = {
  deckId: number
  deckName: string
  startedAt: Date
}

export type Card = {
  id: number
  front: string
  back: string
  exampleSentence: string
}

export type MemberDeck = {
  memberId: string
  deckId: number
}