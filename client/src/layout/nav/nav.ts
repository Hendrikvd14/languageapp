import { Component, inject, OnInit, signal } from '@angular/core';
import { themes } from '../theme';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {

  private router = inject(Router);

  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;
  protected accountService = inject(AccountService);

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  handleSelectUserItem() {
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
