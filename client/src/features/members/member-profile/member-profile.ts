import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-member-profile',
  imports: [],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  constructor() {
   console.log('MemberProfile');
  }
  ngOnInit(): void {
    console.log('onInit');
  }
}
