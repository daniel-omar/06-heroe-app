import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public action: string = "Agregar";

  public heroeForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl('')
  })

  public publishers = [
    { id: "DC Comics", desc: "DC - COMICS" },
    { id: "Marvel Comics", desc: "MARVEL - COMICS" }
  ]

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _heroeService: HeroesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (!this.router.url.includes("edit")) {
      return;
    };

    this.action = "Editar"
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroeService.getHeroById(id))
      ).subscribe(hero => {

        if (!hero) return this.router.navigateByUrl('/list');

        this.heroeForm.reset(hero);
        return;
      })

  }

  saveHeroe() {
    if (this.heroeForm.invalid) {
      this.heroeForm.markAllAsTouched()
      return;
    }

    if (this.currentHero.id) {
      this._heroeService.updateHeroById(this.currentHero)
        .subscribe(heroe => {
          console.log(heroe)
          this.showSnackBar(`${heroe?.superhero} actualizado`)
        });
      return;
    }

    this._heroeService.addHero(this.currentHero)
      .subscribe(heroe => {
        this.showSnackBar(`${heroe?.superhero} registrado`)
        this.router.navigate(['/heroes/edit', heroe?.id])
      })

  }

  deleteHeroe() {

  }

  get currentHero(): Heroe {
    const heroe = this.heroeForm.value as Heroe;
    return heroe;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'done', {
      duration: 2500
    })
  }

  onConfirmeDelete() {
    if (!this.currentHero.id) throw Error("Heroe id is required");

    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroeForm.value
    });

    dialog.afterClosed()
      .pipe(
        filter((result: boolean) => result),//solo permite la ejecucion si el resultado es verdadero
        switchMap(() => this._heroeService.deleteHeroById(this.currentHero.id)), //cambiamos a otra suscripcion
        tap((wasDeleted) => wasDeleted)
      )
      .subscribe(result => {
        this.router.navigate(["/heroes/list"])
      })

    // dialog.afterClosed().subscribe(result => {
    //   if (!result) return;

    //   console.log("deleted")
    //   this._heroeService.deleteHeroById(this.currentHero.id).subscribe(response => {
    //     if (!response) console.log(response);

    //     this.router.navigate(["/heroes/list"])
    //   })
    // })

  }
}
