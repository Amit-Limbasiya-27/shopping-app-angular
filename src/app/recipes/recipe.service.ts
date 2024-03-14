import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    onRecipeChanged = new Subject<Recipe[]>();
    constructor(private slService:ShoppingListService) {
        
    }
    private recipes: Recipe[] = [
        new Recipe("Tasty Burger","This is the burger!","https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg?w=1380&t=st=1710249618~exp=1710250218~hmac=e5d8b271fe809fcc1190d0578367f80d7862b60cc33c7109ce1710ede97baed2",
            [{name:"a",amount:5},{name:"b",amount:15}]),
        new Recipe("Pizza","What else you want to know!","https://img.freepik.com/free-photo/top-view-pepperoni-pizza-with-mushroom-sausages-bell-pepper-olive-corn-black-wooden_141793-2158.jpg",
            [{name:"c",amount:25},{name:"d",amount:45}])
    ];

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