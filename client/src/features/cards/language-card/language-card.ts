import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  protected cards = signal<Card[]>([]);
  protected activeIndex = signal(0);
  protected showBack = signal(false);


  protected activeCard = computed<Card | null>(() => {
    const cards = this.cards();
    const index = this.activeIndex();
    

    return cards[index] ?? null;
  });

  ngOnInit(): void {
    this.loadCards();
    console.log('ngOnInit: activeIndex: ' + this.activeIndex);
  }

  showBackCard(value: boolean) {
    console.log(value);
    this.showBack.set(value);
  }


  loadCards() {
    this.cardService.getCards().subscribe({
      next: response => {
        this.cards.set(response);
        this.activeIndex.set(0)
      }
    })
  }

  previousCard() {
    const previousIndex = this.activeIndex() - 1;

    if (previousIndex !== -1) {
      this.activeIndex.set(previousIndex);
    } else {
      this.activeIndex.set(0);
    }
    this.showBackCard(false);
  }

  nextCard() {
    const nextIndex = this.activeIndex() + 1;

    if (nextIndex < this.cards().length) {
      this.activeIndex.set(nextIndex);
    } else {
      this.activeIndex.set(0);
    }
    this.showBackCard(false);
  }


}
