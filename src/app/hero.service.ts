import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}
@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';  // URL to web api

  /**
   * Handle failed HTTP Operation while letting the app continue
   * so it has to return a safe value so it doesn't crash the app. 
   * This is like setting the initial state in a React app (maybe)
   * @param operation - name of operation that failed
   * @param result - optional value to return as observable result
   */

  //  Wow you can define stuff I wonder if you can do that in other languages?
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      //this keeps the app running by returning an array
      //because that's what it is looking for. 
      
      return of (result as T)
    }
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero with id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero with id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    );
  }

  /**
   * 
   * @param id - ID of hero you are looking for
   */
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.heroesUrl}/${id}`;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // GET Heroes from the server
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    // piping data through the rest of the function
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }


  /**
   * function that searches for heroes and tries to save bandwidth
   * @param term - search term
   */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // return empty array if there is no search term match
      return of ([]);
    }
    //if there IS a match return the following
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(tap(_ => this.log(`Found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',[])))
  }

  /**
   * 
   * @param hero - The hero we want to update
   */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
}