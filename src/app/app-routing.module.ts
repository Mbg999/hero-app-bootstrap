import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { HerosContainerComponent } from './components/heros-container/heros-container.component';
import { HeroComponent } from './components/hero/hero.component';

const routes: Routes = [
  { path: '', children: [
    { path: '', component: HerosContainerComponent, pathMatch: 'full' },
    { path: ':name', component: HerosContainerComponent }
  ]},
  { path: 'hero/:id', component: HeroComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
