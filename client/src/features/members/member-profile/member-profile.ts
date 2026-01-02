import { Component, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { Deck, Member } from '../../../types/member';
import { MemberDeckModal } from '../memberDeck-modal/memberDeck-modal';


@Component({
  selector: 'app-member-profile',
  imports: [MemberDeckModal],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  @ViewChild('languageModal') modal!: MemberDeckModal;
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  member = input.required<Member>();
  //protected deck = signal<Deck | null>(null);
  constructor() {
    console.log('MemberProfile');
  }
  ngOnInit(): void {
    console.log('onInit');
    console.log('Member ' + this.memberService.member()?.displayName);
  }

  addDeckToMember() {
    this.memberService.addDeckToMember(0);
  }
  openModal() {
    this.modal.open();
  }

  onClose() {
    console.log('Modal closed');
  }

  onLanguageSelected(deck: Deck) {
    // hier kan je:
    // - een MemberDeck aanmaken
    // - een API call doen
    // - het profiel updaten

    this.memberService.addDeckToMember(deck.id);



  }

}
