import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/shopping-list-store/shopping-list.reducer';
import { authReducer } from './auth/auth-store/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({shoppingList:shoppingListReducer,auth:authReducer})
  ], 
  providers: [ RecipeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
