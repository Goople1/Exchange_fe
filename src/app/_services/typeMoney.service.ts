import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TypeMoneis } from '@/_models/monies';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class TypeMoneyService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<TypeMoneis>(`${environment.apiUrl}/channel/exchange/v1/exchange/monies`).pipe(map((response: any) => {
                return response.body;
          }));
    }
}