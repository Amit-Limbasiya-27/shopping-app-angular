import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @Output() onIngredientAdd = new EventEmitter<Ingredient>();
  
  @ViewChild('nameInput',{static:false}) nameInput:ElementRef;
  @ViewChild('amountInput',{static:false}) amountInput:ElementRef;

  addIngredient(){
    this.onIngredientAdd.emit(new Ingredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value));    
  }
}
