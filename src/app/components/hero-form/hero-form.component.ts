import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// INTERFACE
import { Hero } from './../../interfaces/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit, OnChanges {
  @Input('hero') public hero!: Hero;
  @Output('close') public close = new EventEmitter<void>();
  @Output('create') public create = new EventEmitter<Hero>();
  @Output('update') public update = new EventEmitter<Hero>();
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero'].currentValue) {
      this.setHero();
    } else if (this.form) {
      this.form.reset();
    }
  }

  private createForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(16),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000),
        ],
      ],
      image: [
        '',
        [
          Validators.maxLength(200),
          Validators.pattern(
            /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
          ),
        ],
      ],
    });
  }

  private setHero() {
    this.form.get('name').setValue(this.hero.name);
    this.form.get('description').setValue(this.hero.description);
    this.form.get('image').setValue(this.hero.image);
  }

  public submit() {
    const hero: Hero = this.form.value;
    if (this.form.valid) {
      if (this.hero) {
        hero.id = this.hero.id;
        this.update.emit(hero);
      } else this.create.emit(hero);
      this.form.reset();
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].markAsTouched();
      });
    }
  }
}
