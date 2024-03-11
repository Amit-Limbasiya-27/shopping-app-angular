import { Directive, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector:"[appDropdown]"
})
export class DropDownDirective implements OnInit{
    @HostBinding('class.open') isOpen:boolean = false;
    @HostListener('click') Toggle(){
        this.isOpen = !this.isOpen;
    }
    ngOnInit(): void {
        this.isOpen = false;
    }
}