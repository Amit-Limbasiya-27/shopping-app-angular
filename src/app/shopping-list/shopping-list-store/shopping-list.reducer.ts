import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import { addIngredientAction, addIngredientsAction, deleteIngredientAction, editingIngredientAction, stopEditingIngredientAction, updateIngredientAction } from "./shopping-list.actions";

const initialState = {
    ingredients:[
        new Ingredient("Apple",5),
        new Ingredient("Tomatos",15),
        new Ingredient("Banana",12)
    ],
    editingItem:null,
    editingItemIndex:-1
}
export const shoppingListReducer = createReducer(initialState,
    on(addIngredientAction,(state,action)=>({...state,ingredients:[...state.ingredients,action.ingredient]})),
    on(updateIngredientAction,(state,action)=>{
        let newState = {...state,ingredients:[...state.ingredients]};
        newState.ingredients[action.index] = action.newIngredient;
        newState.editingItem=null;
        newState.editingItemIndex = -1;
        return newState;
    }),
    on(addIngredientsAction,(state,action)=>
        ({...state,ingredients:[...state.ingredients,...action.ingredients]})
    ),
    on(deleteIngredientAction,(state,action)=>
        ({...state,ingredients:[...state.ingredients.filter((_,index)=>index!=action.index)]})
    ),
    on(editingIngredientAction,(state,action)=>
        ({...state,editingItemIndex:action.index,editingItem:{...state.ingredients[action.index]}})
    ),
    on(stopEditingIngredientAction,(state)=>
        ({...state,editingItem:null,editingItemIndex:-1})
    )
);