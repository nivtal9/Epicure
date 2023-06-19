import { NgModule, isDevMode } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from 'src/cmps/nav-bar/nav-bar.component';
import { AppComponent } from 'src/cmps/app/app.component';
import { HeroComponent } from 'src/cmps/hero/hero.component';
import { FooterComponent } from 'src/cmps/footer/footer.component';
import { RestaurantComponent } from 'src/cmps/restaurant/restaurant.component';
import { PopularRestaurantsComponent } from 'src/cmps/popular-restaurants/popular-restaurants.component';
import { DishesComponent } from 'src/cmps/dishes/dishes.component';
import { SignatureDishesComponent } from 'src/cmps/signature-dishes/signature-dishes.component';
import { IconMeaningComponent } from 'src/cmps/icon-meaning/icon-meaning.component';
import { ChefoftheweekComponent } from 'src/cmps/chefoftheweek/chefoftheweek.component';
import { AboutUsComponent } from 'src/cmps/about-us/about-us.component';
import { ShoppingBagComponent } from 'src/cmps/shopping-bag/shopping-bag.component';
import { SearchComponent } from 'src/cmps/search/search.component';
import { LoginComponent } from 'src/cmps/login/login.component';
import { HomePageComponent } from 'src/cmps/Routes/home-page/home-page.component';
import { RestaurantsPageComponent } from 'src/cmps/Routes/restaurants-page/restaurants-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantsNavBarComponent } from '../cmps/restaurants-nav-bar/restaurants-nav-bar.component';
import { StoreModule } from '@ngrx/store';
import { homePageReducer, IState, restaurantsPageReducer, restaurantPageReducer, shoppingBagReducer } from 'src/cmps/store/epicure/epicureReducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RestaurantPageComponent } from 'src/cmps/Routes/restaurant-page/restaurant-page.component';
import { DishModalComponent } from '../cmps/dish-modal/dish-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { SidesPipe } from 'src/cmps/pipes/sides.pipe';
import { ChangesPipe } from 'src/cmps/pipes/changes.pipe';
import { Test2Component } from 'src/cmps/test2/test2.component';
import { NewOrderVerificationComponent } from 'src/cmps/new-order-verification/new-order-verification.component';
import { HttpClientModule } from '@angular/common/http';
import { restaurantsEffects } from 'src/cmps/store/epicure/restaurants.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { dishesEffects } from 'src/cmps/store/epicure/dishes.effects';
import { chefsEffects } from 'src/cmps/store/epicure/chefs.effects';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeroComponent,
    FooterComponent,
    RestaurantComponent,
    PopularRestaurantsComponent,
    DishesComponent,
    SignatureDishesComponent,
    IconMeaningComponent,
    ChefoftheweekComponent,
    AboutUsComponent,
    ShoppingBagComponent,
    SearchComponent,
    LoginComponent,
    HomePageComponent,
    RestaurantsPageComponent,
    RestaurantsNavBarComponent,
    RestaurantPageComponent,
    DishModalComponent,
    SidesPipe,
    ChangesPipe,
    Test2Component,
    NewOrderVerificationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    StoreModule.forRoot<IState>({
      restaurantsPage: restaurantsPageReducer, homePage: homePageReducer,
      restaurantPage: restaurantPageReducer, shoppingBag: shoppingBagReducer
    }),
    EffectsModule.forRoot([restaurantsEffects, dishesEffects, chefsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
