import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'heroe-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public heroe!: Heroe;

  ngOnInit(): void {
    if (!this.heroe) throw new Error('Method not implemented.');
  }
}
