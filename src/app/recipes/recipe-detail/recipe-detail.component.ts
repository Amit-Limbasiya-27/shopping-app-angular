import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addIngredientsAction, updateIngredientAction } from '../../shopping-list/shopping-list-store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(
    private recipeService:RecipeService, 
    private route: ActivatedRoute, 
    private router:Router, 
    private store:Store
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);
    })
  }
  
  
  addToShoppingList(){
    this.store.dispatch(addIngredientsAction({ingredients:this.recipe.ingredients}))
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
