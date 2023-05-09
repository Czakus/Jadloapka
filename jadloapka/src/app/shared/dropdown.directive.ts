import { parseHostBindings } from "@angular/compiler";
import { Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    // constructor(private elementRef: ElementRef) { }
    // @HostListener('click') toggleOpen(eventData: Event) {
    //     if(this.elementRef.nativeElement.className === "btn-group")
    //         this.elementRef.nativeElement.className = "btn-group open"; else
    //         this.elementRef.nativeElement.className = "btn-group";
    // }

    @HostBinding('class.open') isOpen = false;
    @HostListener('click') toggleOpen(eventData: Event) {
        this.isOpen = !this.isOpen;
    }
}
