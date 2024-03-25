import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private hS: HeroService) { }

  ngOnInit(): void {
    this.hS.getHeroes().subscribe(heroes => this.heroes = heroes);
  }


}
