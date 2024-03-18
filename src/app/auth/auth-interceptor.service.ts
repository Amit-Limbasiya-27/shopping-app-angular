import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(take(1),exhaustMap(user=>{
            //to bypass the auth params setting when the login request made
            if(!user){
                return next.handle(req);
            }
            let modifiedReq = req.clone({params:new HttpParams().set('auth',user.token)});
            return next.handle(modifiedReq);
        }))
    }
}