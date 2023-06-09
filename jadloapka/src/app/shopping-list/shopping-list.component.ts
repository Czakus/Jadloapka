import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingChanged.subscribe(
      (ing: Ingredient[]) => {
        this.ingredients = ing;
      }
    )
  }

  onSelectedIngredient(index: number) {
    this.shoppingListService.indexOfChosenIngredient.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
