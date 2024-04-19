import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Heroe[] = [];
  public selectedHeroe?: Heroe;

  constructor(private _heroesService: HeroesService) {

  }

  searchHeroe() {
    const value: string = this.searchInput.value || '';
    console.log(value)
    this._heroesService.getHeroSuggestions(value)
      .subscribe(heroes => {
        this.heroes = heroes;
        console.log(heroes)
      })
  }

  onSelectedOption(evento: MatAutocompleteSelectedEvent) {
    if (!evento.option.value) {
      this.selectedHeroe = undefined;
      return;
    }

    this.selectedHeroe = evento.option.value;
    this.searchInput.setValue(this.selectedHeroe!.superhero)

  }
}
