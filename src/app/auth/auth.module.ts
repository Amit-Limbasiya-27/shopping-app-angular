import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const authRoutes: Routes=[
    { 
        path: "", 
        component: AuthComponent 
    }
]

@NgModule({
    declarations:[
        AuthComponent
    ],
    imports: [ FormsModule, RouterModule.forChild(authRoutes), SharedModule ]
})
export class AuthModule{}