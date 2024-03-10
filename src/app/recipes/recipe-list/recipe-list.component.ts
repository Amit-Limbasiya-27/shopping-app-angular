import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe("Test recipe 1","This is the test1!","https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg"),
    new Recipe("Test recipe 2","This is the test2!","https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg")
  ];
  
  @Output() loadRecipeDetail = new EventEmitter<Recipe>();
  constructor() {
    
  }

  onSelectRecipeItem(recipe:Recipe){
    this.loadRecipeDetail.emit(recipe);
  }
}
