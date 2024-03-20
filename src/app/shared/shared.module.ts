import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropDownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropDownDirective,
        PlaceholderDirective
    ],
    imports: [CommonModule],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropDownDirective,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule { }