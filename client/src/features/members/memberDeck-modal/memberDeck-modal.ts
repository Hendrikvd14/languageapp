import { Component, ElementRef, inject, output, signal, ViewChild } from '@angular/core';
import { DeckService } from '../../../core/services/deck-service';
import { AsyncPipe } from '@angular/common';
import { Deck, MemberDeckDto } from '../../../types/member';
import { Observable } from 'rxjs';
import { MemberService } from '../../../core/services/member-service';
import { ModalMode } from '../../../types/modals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberdeck-modal',
  imports: [AsyncPipe],
  templateUrl: './memberdeck-modal.html',
  styleUrl: './memberdeck-modal.css',
})
export class MemberDeckModal {
  @ViewChild('languageDialog') modalRef!: ElementRef<HTMLDialogElement>;

  protected deckService = inject(DeckService);
  protected memberService = inject(MemberService);
  closeModal = output<void>();
  languageSelected = output<Deck>();
  selectedDeck = signal<Deck | null>(null)
  decks$?: Observable<Deck[]>;
  mode = signal<ModalMode>('add');

  constructor(private router: Router) {
    console.log("Decks + " + this.deckService.getDecks());
  }

  openAddCourse() {
    this.mode.set('add');
    this.selectedDeck.set(null);
    this.decks$ = this.deckService.getDecksNotLinkedToUser();
    this.modalRef.nativeElement.showModal();
  }

  openStudyCourse() {
    console.log('openStudyCourse');
    this.mode.set('study');
    this.selectedDeck.set(null);
    this.decks$ = this.deckService.getDecksLinkedToUser();
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
    this.decks$ = undefined;
    this.selectedDeck.set(null);
    this.closeModal.emit();
  }

  selectLanguage(deck: Deck) {
    this.selectedDeck.set(deck)
    this.submit();
  }

  submit() {
    const deck = this.selectedDeck();
    if (!deck) return;

    if (this.mode() === 'add') {
      this.memberService.addDeckToMember(deck.id).subscribe({
        next: res => console.log('SUCCESS', res),
        error: err => console.error('ERROR', err)
      });
    }

    if (this.mode() === 'study') {
      this.languageSelected.emit(deck);
      this.router.navigate([`/cards/${deck.id}`]);
    }
    this.close();
  }
}
