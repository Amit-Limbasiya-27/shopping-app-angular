import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Observable, Subscription, map } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { StoreType } from "../shared/Store-type";
import { User } from "../auth/user.model";
@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated:boolean=false;
    private userSubcription:Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService,private store:Store<StoreType>) { }

    ngOnInit(): void {
        this.userSubcription = this.store.select('auth').pipe(map(authstate=>authstate.user)).subscribe(user=>{
            this.isAuthenticated = !!user
        })
    }
    
    ngOnDestroy(): void {
        this.userSubcription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipe();
    }
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
    onLogout(){
        this.authService.logout();
    }
}