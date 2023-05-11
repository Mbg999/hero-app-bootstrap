import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Subscription } from 'rxjs';

// SERVICES
import { HeroService } from './../../services/hero.service';

// INTERFACES
import { Hero } from './../../interfaces/hero';

// SWEETALERT2
import Swal from 'sweetalert2';

// BOOTSTRAP
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-heros-container',
  templateUrl: './heros-container.component.html',
  styleUrls: ['./heros-container.component.scss'],
})
export class HerosContainerComponent implements OnInit, OnDestroy {
  public toUpdateHero?: Hero;
  public heros!: Hero[];
  private subscriptions = new Subscription();
  private modal: bootstrap.Modal;

  constructor(
    private _heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this._heroService.heros$.subscribe((h) => (this.heros = h))
    );
    this.subscriptions.add(
      this.route.params.subscribe((params) => this.search(params['name']))
    );
    this.modal = new bootstrap.Modal(
      document.getElementById('hero-form-modal'),
      { backdrop: 'static', keyboard: false }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public newHero(): void {
    this.modal.show();
  }

  public create(hero: Hero): void {
    this._heroService.create(hero);
    this.modal.hide();
  }

  public edit(hero: Hero): void {
    this.toUpdateHero = hero;
    this.modal.show();
  }

  public update(hero: Hero): void {
    if (this._heroService.update(hero)) {
      this.modal.hide();
      this.toUpdateHero = null;
    }
  }

  public remove(hero: Hero): void {
    Swal.fire({
      title: '¿Desea borrar este heroe?',
      text: `${hero.name}`,
      icon: 'error',
      confirmButtonText: 'Borrar',
      confirmButtonColor: '#EF4444',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#3b82f6',
    }).then((result) => {
      if (result.isConfirmed) this._heroService.remove(hero.id);
    });
  }

  public search(value: string): void {
    this.heros = value
      ? this._heroService.searchByName(value.toLowerCase())
      : this._heroService.getHeros();
  }

  public closeFormModal(): void {
    this.modal.hide();
    this.toUpdateHero = null;
  }
}
