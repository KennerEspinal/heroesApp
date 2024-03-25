import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: ``
})
export class NewHeroPageComponent implements OnInit {

  heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private hS: HeroService,
    private aR: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.aR.params
      .pipe(
        switchMap(({ id }) => this.hS.getHeroById(id)),
      ).subscribe(hero => {

        if (!hero) return this.router.navigateByUrl('/heroes/list')

        this.heroForm.reset(hero)

        return;
      });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit() {

    if (this.heroForm.invalid) return;
    // this.hS.updateHero(this.heroForm.value)

    if (this.currentHero.id) {
      this.hS.updateHero(this.currentHero)
        .subscribe(hero => console.log('Actualizado', hero));
      return;
    }

    this.hS.addHero(this.currentHero)
      .subscribe(hero => console.log('Creado', hero));

  }
}
