import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import { StoreType } from "../shared/Store-type";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router,private store:Store<StoreType>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select('auth').pipe(
            take(1),
            map(authState=>authState.user),
            map(user => {
            if (user)
                return true;
            else
                return this.router.createUrlTree(['/auth']);
        }))
    }
}