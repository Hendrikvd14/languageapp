import { Component, inject, Input, input, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
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
export class MemberProfile  {
  @ViewChild('languageDialog') modal!: MemberDeckModal;
  protected memberService = inject(MemberService);
  member = input.required<Member>();
  protected selectedDeck = signal<MemberDeckDto | null>(null);


  constructor(private router: Router) {
  }
  
  addDeckToMember() {
    this.memberService.addDeckToMember(0);
  }
  openModal() {
    this.modal.openAddCourse();
  }
   openStudyModal() {
    this.modal.openStudyCourse();
  }

 
  onClickSelectedDeck(deck: MemberDeckDto) {
    
    if (this.selectedDeck() === deck) {
      
      this.selectedDeck.set(null);
    } else {
      this.selectedDeck.set(deck);
      console.log('1')
    }
  }


}
