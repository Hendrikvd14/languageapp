import { Component, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { Deck, Member, MemberDeckDto } from '../../../types/member';
import { MemberDeckModal } from '../memberDeck-modal/memberDeck-modal';
import { Router } from '@angular/router';
import { ProgressData, ProgressChart } from '../../../shared/progress-chart/progress-chart';


@Component({
  selector: 'app-member-profile',
  imports: [MemberDeckModal, ProgressChart],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  @ViewChild('languageDialog') modal!: MemberDeckModal;
  protected memberService = inject(MemberService);
  member = input.required<Member>();
  protected selectedDeck = signal<MemberDeckDto | null>(null);

/* deckProgress: ProgressData = {
    completed: 48,
    inProgress: 12,
    notStarted: 40
  };

  vocabularyProgress: ProgressData = {
    completed: 620,
    inProgress: 180,
    notStarted: 200
  }; */


  constructor(private router: Router) {
    console.log('MemberProfile');
  }
  ngOnInit(): void {
    console.log('Member ' + this.memberService.member()?.displayName);
  }

  addDeckToMember() {
    this.memberService.addDeckToMember(0);
  }
  openModal() {
    this.modal.openAddCourse();
  }
   openStudyModal() {
    console.log('openModalCards');
    this.modal.openStudyCourse();
  }

 
  onClickSelectedDeck(deck: MemberDeckDto) {
    
    if (this.selectedDeck() === deck) {
      console.log('selectedDeckId: ' + this.selectedDeck())
      this.selectedDeck.set(null);
    } else {
      this.selectedDeck.set(deck);
    }
  }


}
