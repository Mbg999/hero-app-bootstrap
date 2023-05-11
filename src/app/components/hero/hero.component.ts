import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// INTERFACES
import { Hero } from './../../interfaces/hero';

// SERVICES
import { HeroService } from './../../services/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  public hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _heroService: HeroService
  ) {}

  ngOnInit(): void {
    if (
      isNaN(this.route.snapshot.params['id']) ||
      this.route.snapshot.params['id'] < 1
    ) {
      this.router.navigate(['']);
    } else {
      this.hero = this._heroService.searchById(
        this.route.snapshot.params['id']
      );
    }
  }
}
