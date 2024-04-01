import { Ingredient } from "./ingredient.model"

export type StoreType={
    shoppingList:{ingredients:Ingredient[],editingItem:Ingredient,editingItemIndex:number};
    auth:{user:{email:string,id:string,token:string,tokenExpirationDate:Date}}
}