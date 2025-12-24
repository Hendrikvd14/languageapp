import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MascotIcon } from "../../shared/mascot-icon/mascot-icon";
import { AccountService } from '../../core/services/account-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MascotIcon, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  
  protected registerMode = signal(false);
  protected accountService = inject(AccountService);
  protected showDemo = signal(false);

  @ViewChild('demoVideo') demoVideo?: ElementRef<HTMLVideoElement>;

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }

  openDemo() {
    this.showDemo.set(true);
  }

  closeDemo() {
    this.showDemo.set(false);
  }

  ngAfterViewInit(): void {
    if (this.showDemo() && this.demoVideo) {
      const video = this.demoVideo.nativeElement;
      video.play().catch(error => {
        console.error('Autoplay geblokkeerd:', error);
      });
    }
  }
}
