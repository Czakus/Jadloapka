import { Component,EventEmitter,Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
    recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
    new Recipe('Another Test Recipe', 'This is test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
    ];

    @Output() selectedRecipe = new EventEmitter <Recipe>();
    onrecipeSelected(selectedRecipeEl: Recipe) {
      this.selectedRecipe.emit(selectedRecipeEl);
    }
}
