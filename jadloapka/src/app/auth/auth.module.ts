import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const authRoutes: Routes = [
    {path: '', component: AuthComponent}
]

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild(authRoutes)
    ]
})
export class AuthModule {

}