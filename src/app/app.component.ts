import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import { Subject } from "rxjs";
import { debounceTime, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  public searchStr: string;
  public users: { fullName: string }[] = [];

  public userLookup$: Subject<void> = new Subject();
  public isLoading: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userLookup$
      .pipe(
        debounceTime(200),
        tap(() => {
          this.isLoading = true;
          this.users = [];
        }),
        switchMap(() => {
          return this.dataService.getUsers(this.searchStr);
        })
      )
      .subscribe(res => {
        this.isLoading = false;
        this.users = res;
      });

    // initial load
    this.userLookup$.next();
  }

  public onSearchStrChanged() {
    this.userLookup$.next();
  }
}
