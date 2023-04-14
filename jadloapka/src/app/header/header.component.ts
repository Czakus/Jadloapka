import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    selectedPage: string;
    @Output() pageHasChanged = new EventEmitter<string>();

    onSelectedPage(page:string) {
        this.selectedPage=page;
        this.pageHasChanged.emit(this.selectedPage);
    }

}