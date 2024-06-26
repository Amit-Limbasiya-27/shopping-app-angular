import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  id:number;
  editMode:boolean = false;
  recipeForm:FormGroup;
  constructor(private route:ActivatedRoute, 
        private recipeService:RecipeService,
        private router:Router) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.editMode = params['id'] != null ;
    });
    this.initForm();
  }

  initForm(){
    let recipeName='';
    let imagePath='';
    let description='';
    let ingredients=new FormArray([]);
    if(this.editMode){
      const recipe= this.recipeService.getRecipeById(this.id);
      recipeName=recipe.name;
      imagePath=recipe.imagePath;
      description= recipe.description;

      if(recipe.ingredients.length>0){
        for (let index = 0; index < recipe.ingredients.length; index++) {
          const ingredient : Ingredient = recipe.ingredients[index];
          ingredients.push(new FormGroup({
            'name':new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients':ingredients
    });
  }
  get ingredients(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  
  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(["../"],{relativeTo:this.route});
  }
  onDeleteIngredient(index:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
