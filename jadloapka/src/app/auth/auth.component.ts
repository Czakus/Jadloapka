import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnDestroy {

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver) { }

    isLoginMode = true;
    isLoading = false;

    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false})  alerthost: PlaceholderDirective;
    private closeAlertSubscription: Subscription;

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
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.error = 'An error during siginig up occured! <br>  Error message: ' + errorMessage;
            this.showErrorAlert(this.error);
            this.isLoading = false;
        })
    }

    onHandleError() {
      this.error = null;
    }

    showErrorAlert(message: string) {
      const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainer = this.alerthost.viewContainerRef;
      hostViewContainer.clear();

      const componentRef = hostViewContainer.createComponent(alertCompFactory);
      componentRef.instance.message = message;
      this.closeAlertSubscription = componentRef.instance.close.subscribe(() => {
        this.closeAlertSubscription.unsubscribe();
        hostViewContainer.clear();
      });
    }

    ngOnDestroy(): void {
      if(this.closeAlertSubscription) this.closeAlertSubscription.unsubscribe();
    }
}
