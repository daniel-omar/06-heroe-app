import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Heroe } from '../interfaces/heroe.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getHeroes(): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Heroe | undefined> {
    return this.httpClient.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError((error) => {
          return of(undefined)
        })
      );
  }

  getHeroSuggestions(query: string): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
      .pipe(
        catchError((error) => {
          console.log(error)
          return of([])
        })
      );
  }

  addHero(heroe: Heroe): Observable<Heroe | undefined> {
    return this.httpClient.post<Heroe>(`${this.baseUrl}/heroes`, heroe)
      .pipe(
        catchError((error) => {
          return of(undefined)
        })
      );
  }

  updateHeroById(heroe: Heroe): Observable<Heroe | undefined> {
    return this.httpClient.patch<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
      .pipe(
        catchError((error) => {
          return of(undefined)
        })
      );
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.httpClient.delete<Heroe>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map(x => true),
        catchError((error) => of(false))
      );
  }
}
