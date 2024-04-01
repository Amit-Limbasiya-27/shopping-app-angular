import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { addIngredientAction, deleteIngredientAction, stopEditingIngredientAction, updateIngredientAction } from '../shopping-list-store/shopping-list.actions';
import { StoreType } from '../../shared/Store-type';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editingSubscription:Subscription;
  editMode:boolean = false;
  editingItem:Ingredient;
  editingItemIndex:number;

  constructor(private store:Store<StoreType>) {}
  
  ngOnInit(): void {
    this.editingSubscription = this.store.select('shoppingList').subscribe(data=>{
      if(data.editingItem!==null){
        this.editMode = true;
        this.editingItemIndex = data.editingItemIndex;
        this.editingItem = data.editingItem;
        this.form.setValue({
          name:this.editingItem.name,
          amount:this.editingItem.amount
        })
      }
      else
        this.editMode = false;
    });
  }

  onAddOrUpdateIngredient(form:NgForm){
    const value = form.value;
    const newIngredient:Ingredient = new Ingredient(value.name,value.amount)
    if(this.editMode){
      this.store.dispatch(updateIngredientAction({index:this.editingItemIndex, newIngredient: newIngredient}));
    }
    else{
      this.store.dispatch(addIngredientAction({ingredient:newIngredient}));
    }
    this.onClear();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(stopEditingIngredientAction());
  }

  onDelete(){
    this.store.dispatch(deleteIngredientAction({index:this.editingItemIndex}));
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }
}
