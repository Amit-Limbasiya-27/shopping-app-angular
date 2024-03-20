import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [];
    onRecipeChanged = new Subject<Recipe[]>();

    constructor(private slService:ShoppingListService) {}

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.onRecipeChanged.next(this.recipes.slice());
    }
    getRecipes(){
        return this.recipes.slice();
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.onRecipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,recipe:Recipe){
        this.recipes[index]=recipe;
        this.onRecipeChanged.next(this.recipes.slice());
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    getRecipeById(id:number){
        return this.recipes[id];
    }
    deleteRecipe(id:number){
        this.recipes.splice(id,1);
        this.onRecipeChanged.next(this.recipes.slice());
    }
}