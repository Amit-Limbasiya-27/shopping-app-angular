import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  constructor(private shoppingListService : ShoppingListService) {}
  
  @ViewChild('nameInput',{static:false}) nameInput:ElementRef;
  @ViewChild('amountInput',{static:false}) amountInput:ElementRef;

  addIngredient(){
    this.shoppingListService.addIngredient(new Ingredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value));
  }
}
