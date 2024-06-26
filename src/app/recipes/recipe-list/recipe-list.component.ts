import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit,OnDestroy{
  recipes: Recipe[] ;
  recipeEditSubscription:Subscription;
  constructor(private recipeService: RecipeService,private router:Router, private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes(); 
    this.recipeEditSubscription=this.recipeService.onRecipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
    })   
  }
  
  GoToNewRecipe(){
    this.router.navigate(["new"],{relativeTo:this.route});
  }
  ngOnDestroy(): void {
      this.recipeEditSubscription.unsubscribe();
  }
}
