import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Card } from '../../types/cards';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  
  getCards() {
    return this.http.get<Card[]>(this.baseUrl + 'card');
  }

  getCardsToStudy(deckId: number) {
    return this.http.get<Card[]>(`${this.baseUrl}card/study/${deckId}`);
  }

  addProgress(cardId: number, success: boolean) {
    return this.http.post(this.baseUrl + 'card/progress', {cardId, success});
  }
  
}
