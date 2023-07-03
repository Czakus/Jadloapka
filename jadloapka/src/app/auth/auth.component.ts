import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent {
    constructor(private authService: AuthService) { }
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
        this.error = null;
    }

    onSubmit(form: NgForm) {
        let authObs: Observable<AuthResponseData>;
        this.error = null;
        if (!form.valid) return;

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if (!this.isLoginMode) {
            authObs = this.authService.signUp(email, password);
        } else {
            authObs = this.authService.logIn(email, password);
        }
        form.reset();

        authObs.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
        }, errorMessage => {
            this.error = 'An error during siginig up occured! <br>  Error message: ' + errorMessage;
            this.isLoading = false;
        })
    }
}