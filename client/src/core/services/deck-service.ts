import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Deck } from '../../types/member';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
   private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  deck = signal<Deck | null>(null);

  getDecks() {
    return this.http.get<Deck[]>(this.baseUrl + 'deck/');
  }
}
