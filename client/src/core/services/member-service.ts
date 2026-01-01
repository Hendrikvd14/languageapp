import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member, MemberDeck } from '../../types/member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  member = signal<Member | null>(null);

  getMember(id: string) {
    console.log('member-service ' + id);
    return this.http.get<Member>(this.baseUrl + 'member/' + id).pipe(
      tap(member => {
        this.member.set(member)
      })
    );
  }

  addDeckToMember(id: number) {
    return this.http.post<MemberDeck>(this.baseUrl + 'memberDeck' + id, null)
  }
}
