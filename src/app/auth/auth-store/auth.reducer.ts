import { createReducer, on } from "@ngrx/store";
import { loginAction, logoutAction } from "./auth.actions";
import { User } from "../user.model";

type State = {
    user:User
}
const initialState: State = {
    user: null
}
export const authReducer = createReducer(initialState,
    on(loginAction,(state,action)=>({...state,user:new User(action.email,action.id,action.token,action.tokenExpirationDate)})),
    on(logoutAction,(state)=>({...state,user:null}))
);