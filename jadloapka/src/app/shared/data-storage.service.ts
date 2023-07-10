import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-jadloappka-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-jadloappka-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
        );
    }
}
