import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class DataService {
  private apiRequestDelay = 2000;
  private apiUsers = [
    { fullName: "John Doe" },
    { fullName: "Jane Doe" },
    { fullName: "Max Peterson" },
    { fullName: "Josh Lawrence" },
    { fullName: "Judy Proktis" },
    { fullName: "Felix Geißler" },
    { fullName: "Jasmin Smith" }
  ];

  constructor() {}

  public getUsers(filter?: string) {
    // replace with proper Http.get()
    return this.fakeApiCall(filter);
  }

  private fakeApiCall(filter: string = ""): Observable<any> {
    const res = this.apiUsers.filter(el =>
      el.fullName.toLowerCase().includes(filter.toLowerCase())
    );
    return of(res).pipe(delay(this.apiRequestDelay));
  }
}
