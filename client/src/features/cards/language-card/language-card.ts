import { Component, inject, OnInit, signal } from '@angular/core';
import { CardService } from '../../../core/services/card-service';
import { Card } from '../../../types/cards';

@Component({
  selector: 'app-language-card',
  imports: [],
  templateUrl: './language-card.html',
  styleUrl: './language-card.css',
})
export class LanguageCard implements OnInit {
  
  private cardService = inject(CardService);
  protected cards = signal<Card[] | null>(null);

  ngOnInit(): void {
   this.loadCards(); 
  }

  loadCards() {
    this.cardService.getCards().subscribe({
      next: response => {
        this.cards.set(response);
      }
    })
  }

}
