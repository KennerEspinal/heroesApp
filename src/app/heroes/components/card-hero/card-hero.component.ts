import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-card-hero',
  templateUrl: './card-hero.component.html',
  styles: ``
})
export class CardHeroComponent implements OnInit {
  @Input() hero!: Hero;


  ngOnInit(): void {
    if(!this.hero) throw new Error('hero is required');
  }

}
