import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from 'src/cmps/Routes/home-page/home-page.component';
import { RestaurantPageComponent } from 'src/cmps/Routes/restaurant-page/restaurant-page.component';
import { RestaurantsPageComponent } from 'src/cmps/Routes/restaurants-page/restaurants-page.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path: 'restaurants', component: RestaurantsPageComponent },
  { path: 'restaurants/:name', component: RestaurantPageComponent },
  { path: '**', redirectTo: '/home-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
