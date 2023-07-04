import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";

import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    kind?: string,
    registered?: boolean
}

@Injectable()
export class AuthService {
    constructor(private http: HttpClient,
        private router: Router) { }

    user = new BehaviorSubject<User>(null);

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlfHcw3B8rozlQKER0BnLWdc7qLBlu1Wg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }));
    }

    logIn(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlfHcw3B8rozlQKER0BnLWdc7qLBlu1Wg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                }));
    }

    autoLogIn() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token)
            this.user.next(loadedUser);
    }

    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        //if (!errorRes.error || !errorRes.error.error) return throwError(errorMessage);
        switch (errorRes.error.error.message.toString()) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
        }
        return throwError(errorMessage);
    }
}