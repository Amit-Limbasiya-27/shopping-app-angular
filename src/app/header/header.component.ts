import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated:boolean=false;
    private userSubcription:Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

    ngOnInit(): void {
        this.userSubcription = this.authService.user.subscribe(user=>{
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