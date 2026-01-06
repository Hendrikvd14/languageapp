import { Component, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';
import { Deck, Member, MemberDeckDto } from '../../../types/member';
import { MemberDeckModal } from '../memberDeck-modal/memberDeck-modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-member-profile',
  imports: [MemberDeckModal],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  @ViewChild('languageDialog') modal!: MemberDeckModal;
  protected memberService = inject(MemberService);
  member = input.required<Member>();
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


}
