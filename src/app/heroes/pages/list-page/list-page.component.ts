import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {
  public heroes: Heroe[] = []

  constructor(private _heroesService: HeroesService) {

  }
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this._heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
