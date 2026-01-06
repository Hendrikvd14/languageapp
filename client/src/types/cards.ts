export type Card = {
    id: number
    front: string
    back: string
    exampleSentence: string
}

export type UserCardProgress = {
    id: number
    nextReviewDate: Date
    interval: number
    repetition: number
    easeFactor: number
    isNew: boolean
    memberId: string
    cardId: number
}