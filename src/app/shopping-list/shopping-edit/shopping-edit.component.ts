import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

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

  constructor(private shoppingListService : ShoppingListService) {}
  
  ngOnInit(): void {
    this.editingSubscription = this.shoppingListService.editingItem.subscribe((index:number)=>{
      this.editMode = true;
      this.editingItemIndex = index;
      this.editingItem = this.shoppingListService.getIngredientFromIndex(index);
      this.form.setValue({
        name:this.editingItem.name,
        amount:this.editingItem.amount
      })
    });
  }

  onAddOrUpdateIngredient(form:NgForm){
    const value = form.value;
    const newIngredient:Ingredient = new Ingredient(value.name,value.amount)
    if(this.editMode)
      this.shoppingListService.updateIngredient(this.editingItemIndex, newIngredient);
    else
      this.shoppingListService.addIngredient(newIngredient);
    this.editMode=false;
    form.reset();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteFromIndex(this.editingItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editingSubscription.unsubscribe();
  }
}
