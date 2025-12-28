import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  member = signal<Member | null>(null);

  getMember(id: string) {
    console.log(id);
    return this.http.get<Member>(this.baseUrl + 'member/' + id).pipe(
      tap(member => {
        this.member.set(member)
      })
    );
  }
}
