import { AfterViewInit, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CardService } from '../../../core/services/card-service';
import { Card } from '../../../types/cards';
import { ActivatedRoute } from '@angular/router';
import { MemberDeckModal } from '../../members/memberDeck-modal/memberDeck-modal';


@Component({
  selector: 'app-language-card',
  imports: [MemberDeckModal],
  templateUrl: './language-card.html',
  styleUrl: './language-card.css',
})
export class LanguageCard implements AfterViewInit {

  @ViewChild('languageDialog') modal!: MemberDeckModal;
  private cardService = inject(CardService);
  protected cards = signal<Card[]>([]);
  protected activeIndex = signal(0);
  protected showBack = signal(false);
  private route = inject(ActivatedRoute);
  protected deckId = signal<number | null>(null);
  protected swipeDirection = signal<'left' | 'right' | null>(null);
  protected activeCard = computed<Card | null>(() => {
    const cards = this.cards();
    const index = this.activeIndex();
    return cards[index] ?? null;
  });

  ngAfterViewInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id === 0) {
      this.modal.openStudyCourse();
    } else {
      this.deckId.set(id);


      this.loadCards(id);
    }
  }

  private swipe(direction: 'left' | 'right', cardId: number, success: boolean) {
    this.swipeDirection.set(direction);

    setTimeout(() => {
      if (success) {
        this.cardService.addProgress(cardId, true).subscribe({
          next: res => console.log('SUCCESS', res),
          error: err => console.error('ERROR', err)
        });
      } else {
        this.cardService.addProgress(cardId, false).subscribe({
          next: res => console.log('SUCCESS', res),
          error: err => console.error('ERROR', err)
        });
      }

      this.nextCard();
      this.showBackCard(false);

      // Reset swipe state
      this.swipeDirection.set(null);
    }, 300);

  }

  showBackCard(value: boolean) {
    console.log(value);
    this.showBack.set(value);
  }


  loadCards(deckId: number) {
    this.cardService.getCardsToStudy(deckId).subscribe({
      next: response => {
        this.cards.set(response);
        this.activeIndex.set(0);
      },
      error: err => console.error('CARDERROR', err)
    });
  }

  failedCard(cardId: number) {
     this.swipe('left', cardId, false);
  }

  successCard(cardId: number) {
    this.swipe('right', cardId, true);
  }

  nextCard() {
    const nextIndex = this.activeIndex() + 1;
    if (nextIndex < this.cards().length) {
      this.activeIndex.set(nextIndex);
    } else {
      this.activeIndex.set(0);
    }
  }
}
