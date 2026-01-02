import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { DeckService } from '../../../core/services/deck-service';
import { AsyncPipe } from '@angular/common';
import { Deck } from '../../../types/member';
import { Observable } from 'rxjs';
import { MemberService } from '../../../core/services/member-service';

@Component({
  selector: 'app-memberdeck-modal',
  imports: [AsyncPipe],
  templateUrl: './memberdeck-modal.html',
  styleUrl: './memberdeck-modal.css',
})
export class MemberDeckModal {
  @ViewChild('languageModal') modalRef!: ElementRef<HTMLDialogElement>;
  protected deckService = inject(DeckService);
  protected memberService = inject(MemberService);
  closeModal = output<void>();
  languageSelected = output<Deck>();
  selectedDeck = signal<Deck | null>(null)
  decks$?: Observable<Deck[]>;

  constructor() {
    console.log("Decks + " + this.deckService.getDecks());
  }

  open() {
    if (!this.decks$) {
      this.decks$ = this.deckService.getDecks();
    }
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
    this.closeModal.emit();
  }

  selectLanguage(deck: Deck) {
    this.selectedDeck.set(deck)
    this.submit();
  }

  submit() {
    const deck = this.selectedDeck();
    console.log('Deck ' + deck?.id);
    if (!deck) return;

    this.languageSelected.emit(deck);
    this.memberService.addDeckToMember(deck.id);
    this.close;
  }
}
