import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, map, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import { StoreType } from "../shared/Store-type";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService, private store:Store<StoreType>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(take(1),map(authState=>{return authState.user}),
            exhaustMap(user=>{
                //to bypass the auth params setting when the login request made
                if(!user){
                    return next.handle(req);
                }
                let modifiedReq = req.clone({params:new HttpParams().set('auth',user.token)});
                return next.handle(modifiedReq);
            }))
    }
}