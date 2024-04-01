import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreType } from '../shared/Store-type';
import { Observable } from 'rxjs-compat';
import { editingIngredientAction } from './shopping-list-store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Observable<{ingredients:Ingredient[]}>;
  // ingChangedSubscription: Subscription;

  constructor(private store:Store<StoreType>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {
  }

  onEditItem(index:number){
    this.store.dispatch(editingIngredientAction({index:index}))
  }
}
