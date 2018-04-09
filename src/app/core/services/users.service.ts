import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<{results: Array<any>}>('https://randomuser.me/api/?results=6')
      .pipe(
        map(data => data.results)
      );
  }

}
