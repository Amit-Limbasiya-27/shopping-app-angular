import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode:boolean = true;
    isLoading:boolean = false;
    error:string = null;
    authObservable:Observable<AuthResponseData>;

    constructor(private authService:AuthService, private router:Router) {
        
    }

    switchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm){
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        if(this.isLoginMode){
            this.authObservable = this.authService.login(email,password);
        }
        else{
            this.authObservable = this.authService.signUp(email,password);
        }

        this.authObservable.subscribe(
            res=>{
                this.error=null;
                this.isLoading = false;
                this.router.navigate(["/recipes"]);
            },
            error=>{
                this.error = error.message;
                this.isLoading= false;
            }
        );
        form.reset();
    }
}