import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { routes } from '../../../auth/auth-routing.module';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  private id: string = '';
  public heroe?: Heroe;

  constructor(private _heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // delay(3000),
        switchMap(({ id }) => this._heroeService.getHeroById(id))
      )
      .subscribe(heroe => {
        console.log(heroe)
        if (!heroe) return this.router.navigate(['/heroes/list'])

        this.heroe = heroe;
        return;
      })
  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list')
  }

}
