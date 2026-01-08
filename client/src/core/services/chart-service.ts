import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Chart } from '../../types/chart';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getProgress(deckId: number) {
    return this.http.get<Chart>(`${this.baseUrl}chart/deck/${deckId}/progress`);
  }
}
