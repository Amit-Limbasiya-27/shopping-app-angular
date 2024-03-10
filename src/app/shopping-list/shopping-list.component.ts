import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients:Ingredient[]=[
    new Ingredient("Apple",5),
    new Ingredient("Tomatos",15)
  ];
  AddIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
  }
}
