import { Component, ElementRef, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-memberdeck-modal',
  imports: [],
  templateUrl: './memberdeck-modal.html',
  styleUrl: './memberdeck-modal.css',
})
export class MemberDeckModal {
  @ViewChild('languageModal') modalRef!: ElementRef<HTMLDialogElement>;
  closeModal = output();
  languageSelected = output();
  
  constructor() {

  }

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
    this.closeModal.emit();
  }
}
