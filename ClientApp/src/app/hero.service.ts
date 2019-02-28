import { Injectable } from '@angular/core';
import { Hero } from './classes/hero';
//import { HEROES } from './heroes/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

//ESSENDO UNA COSTANTE VA DICHIARATA A LIVELLO GLOBALE PER FAR SI CHE VENGA LETTA 
//IN TUTTO IL CODICE DELLA PAGINA
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  

  /*private heroesUrl = 'api/heroes';   URL to web api*/

  private heroesUrl = 'https://localhost:5001/api/Eroi';



  constructor(private http: HttpClient,
    private messageService: MessageService) { }



  

  /*addHero(id: number, name: string) {
    console.log("addHero");
    return this.http.post(this.heroesUrl + '/InsertEroe', { id, name }, { responseType: 'text'});

  }*/
    
  getHeroes(): Observable<Hero[]> {
    //invia un messaggio dopo aver recuperato l'eroe
    //this.messageService.add('HeroService: eroe preso');
    return this.http.get<Hero[]>(this.heroesUrl + '/GetEroi')
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  
  //******************PRENDERE IL NOME DELL'EROE*************/
  /** GET hero by id. Will 404 if id not found */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}${'/GetEroeID/'}${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

//******************************AGGIORNARE IL NOME SUL SERVER********** */
/** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl + '/UpdateEroe', hero, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.Id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/****************************AGGIUNGERE UN NUOVO NOME*********/
/** POST: add a new hero to the server */

/*addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}
*/

  addHero(hero: Hero): Observable<Hero> {
    console.log("addHero");
    return this.http.post(this.heroesUrl + '/InsertEroe', hero).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.Id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );

  }


//*********************CANCELLARE UN NOME***************/
/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.Id;
  const url = `${this.heroesUrl}${'/DeleteEroe/'}${id}`;
  

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}


  /*
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.Id;
    const url = this.heroesUrl + '/DeleteEroe' + id;
    return this.http.delete<Hero>(url, httpOptions);
  }*/





/****************************CERCARE PER NOME******************/
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}${/GetEroe/}?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}






  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}




   /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}

}
