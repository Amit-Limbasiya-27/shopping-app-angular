import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
    selectedRecipe = new EventEmitter<Recipe>();
    constructor(private slService:ShoppingListService) {
        
    }
    private recipes: Recipe[] = [
        new Recipe("Test recipe 1","This is the test1!","https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
            [{name:"a",amount:5},{name:"b",amount:15}]),
        new Recipe("Test recipe 2","This is the test2!","https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
            [{name:"c",amount:25},{name:"d",amount:45}])
    ];

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}