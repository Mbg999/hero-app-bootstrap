import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// INTERFACE
import { Hero } from '../interfaces/hero';

// MOCK: 10 HEROS FOR THE FIRST LOAD
import { HEROS_MOCK } from '../mock/heros-mock';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heros!: Hero[];
  private lastId!: number;
  private herosSubject: BehaviorSubject<Hero[]>;
  public heros$: Observable<Hero[]>;

  constructor() {
    this.herosSubject = new BehaviorSubject<Hero[]>([]);
    this.heros$ = this.herosSubject.asObservable();
    this.loadHeros();
  }

  public getHeros(): Hero[] {
    return this.heros;
  }

  public searchById(id: number): Hero | undefined {
    return this.heros.find(h => h.id == id);
  }

  public searchByName(name: string): Hero[] | undefined {
    return this.heros.filter(h => h.name.toLowerCase().includes(name));
  }

  public create(hero: Hero): Hero {
    hero.id = ++this.lastId;
    this.heros.unshift(hero);
    this.saveHeros();
    return hero;
  }

  public update(hero: Hero): boolean {
    const result = !!this.heros.splice(
      this.heros.findIndex(h => h.id === hero.id),
      1,
      hero
    );
    if(result) this.saveHeros();
    return result;
  }

  public remove(id: number): boolean {
    const result = !!this.heros.splice(
      this.heros.findIndex(h => h.id === id),
      1
    );
    if(result) this.saveHeros();
    return result;
  }

  private loadHeros(): void {
    if(localStorage.getItem('firstLoad') != '1') {
      this.heros = HEROS_MOCK;
      localStorage.setItem('firstLoad', '1');
      this.saveHeros();
    } else {
      this.heros = JSON.parse(localStorage.getItem('heros') || '[]');
    }
    this.lastId = this.heros[0]?.id || 0;
  }

  private saveHeros(): void {
    localStorage.setItem('heros', JSON.stringify(this.heros));
    this.herosSubject.next(this.heros);
  }

}
