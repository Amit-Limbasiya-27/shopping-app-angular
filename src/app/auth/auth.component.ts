import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode:boolean = true;
    isLoading:boolean = false;
    error:string = null;
    authObservable:Observable<AuthResponseData>;
    @ViewChild(PlaceholderDirective) alertbox:PlaceholderDirective;
    alertboxCloseSub:Subscription;

    constructor(private authService:AuthService, private router:Router,private componentFactoryResolver:ComponentFactoryResolver) {}

    ngOnDestroy(): void {
        this.alertboxCloseSub.unsubscribe();
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
                this.showAlertBox(error.message);
            }
        );
        form.reset();
    }

    onCloseAlertBox(){
        this.error=null;    
    }

    showAlertBox(message:string){
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const alertComponenetRef = this.alertbox.viewContainerRef.createComponent(alertCmpFactory);
        alertComponenetRef.instance.message=message;
        this.alertboxCloseSub = alertComponenetRef.instance.closeAlertBox.subscribe(()=>{
            this.error = null;
            this.alertbox.viewContainerRef.clear()
            alertComponenetRef.instance.closeAlertBox.unsubscribe();
        })
    }
}