import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    @Input() dropdownClassValue: string;
    @Input() set appDropdown(condition: boolean) {
        if(condition) {
            this.dropdownClassValue = "btn-group";
        } else {
            this.dropdownClassValue = "btn-group open";
        }
    }
}
