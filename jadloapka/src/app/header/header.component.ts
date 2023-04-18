import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    @Output() pageHasChanged = new EventEmitter<string>();

    onSelectedPage(page:string) {
        this.pageHasChanged.emit(page);
    }

}