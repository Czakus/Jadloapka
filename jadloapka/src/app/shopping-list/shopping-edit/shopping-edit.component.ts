import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  createdIngredient: Ingredient;
  private subscription: Subscription;
  editMode = false;
  editItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.indexOfChosenIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.ingredientForm.setValue({
          'name': this.shoppingListService.ingredients[index].name,
          'amount': this.shoppingListService.ingredients[index].amount
        })
      }
    )
  }

  onAddedIngredient() {
    this.createdIngredient = new Ingredient(this.ingredientForm.value['name'], this.ingredientForm.value['amount']);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, this.createdIngredient);
    } else {
      this.shoppingListService.onAddedIngredient(this.createdIngredient);
    }
    this.onClearedForm();
  }

  onDeletedIngredient() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClearedForm();
  }

  onClearedForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
  
