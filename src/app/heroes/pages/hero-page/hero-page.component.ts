import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {
  hero?: Hero;

  constructor(
    private hS: HeroService,
    private aR: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.aR.params
      .pipe(
        switchMap(({ id }) => this.hS.getHeroById(id))
      ).subscribe(hero => {
        if(!hero) return this.router.navigate(['/heroes/list']);
        this.hero = hero;
        return
      })
  }


  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }
}
