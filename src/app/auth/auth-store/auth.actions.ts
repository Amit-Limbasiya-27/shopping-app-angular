import { createAction, props } from "@ngrx/store";

export const loginAction = createAction('LOGIN',props<{email:string;id:string,token:string;tokenExpirationDate:Date}>());

export const logoutAction = createAction('LOGOUT');