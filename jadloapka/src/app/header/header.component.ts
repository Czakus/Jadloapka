import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {

    constructor(private dataStorage: DataStorageService, 
                private authService: AuthService) {}

    private userSub: Subscription;
    isAuthenticated = false;

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;   //!user ? false : true;
        });
    }

    onSaveData() {
        this.dataStorage.storeRecipes();
    }

    onFetchData() {
        this.dataStorage.fetchRecipes().subscribe();
    }

    onLogOut() {
        this.authService.logOut();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}