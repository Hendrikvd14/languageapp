import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";
import { LanguageCard } from "../features/cards/language-card/language-card";
import { MascotIcon } from "../shared/mascot-icon/mascot-icon";
import { filter, map, of } from 'rxjs';
import { Home } from "../features/home/home";
import { AccountService } from '../core/services/account-service';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  
  protected router = inject(Router);
  
}
