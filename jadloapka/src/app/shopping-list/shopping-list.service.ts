import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingChanged = new Subject<Ingredient[]>();
    indexOfChosenIngredient = new Subject<number>();

    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)];
 
    getIngredients() {
        return this.ingredients.slice();
    }

    onAddedIngredient(ing: Ingredient) {
        this.ingredients.push(ing);
        this.ingChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIng: Ingredient) {
        this.ingredients[index] = newIng;
        this.ingChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingChanged.next(this.ingredients.slice());
    }
}