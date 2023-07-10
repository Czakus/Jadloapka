import { NgModule } from "@angular/core";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const shoppingListRoutes: Routes = [
    {path: '', component: ShoppingListComponent}
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(shoppingListRoutes)
    ]
})
export class ShoppingListModule {

}