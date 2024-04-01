import { createAction, props } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

export const addIngredientAction = createAction("ADD_INGREDIENT"
    ,props<{ingredient:Ingredient}>()
);
export const addIngredientsAction = createAction("ADD_INGREDIENTS"
    ,props<{ingredients:Ingredient[]}>()
);
export const updateIngredientAction = createAction("UPDATE_INGREDIENT",
    props<{index:number,newIngredient:Ingredient}>()
);
export const deleteIngredientAction = createAction("DELETE_INGREDIENT",
props<{index:number}>()
);
export const editingIngredientAction = createAction("START_EDITING_INGREDIENT",
    props<{index:number}>()
);
export const stopEditingIngredientAction = createAction("STOP_EDITING_INGREDIENT");