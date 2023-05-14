import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent {
  @Input() recipe: Recipe;
  dropdownClassValue: string = "btn-group";
  
  constructor(private shoppService: ShoppingListService) {}

  onAddToShoppingList() {
    for (let ingredient of this.recipe.ingredients) {
      this.shoppService.onAddedIngredient(ingredient);
    }
  }
}
