import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public hideMobileMenu: boolean = true;

  constructor(private router: Router) {}

  public search(value: string): void {
    this.router.navigate(['', value]);
  }

}
