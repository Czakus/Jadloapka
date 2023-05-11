import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingChanged = new EventEmitter<Ingredient[]>();
    ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)];

    getIngredients() {
        return this.ingredients.slice();
    }

    onAddedIngredient(ing: Ingredient) {
        this.ingredients.push(ing);
        this.ingChanged.emit(this.ingredients.slice());
    }
}