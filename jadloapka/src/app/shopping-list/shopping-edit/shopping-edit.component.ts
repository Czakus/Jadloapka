import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent {
  @ViewChild('f') ingredientForm: NgForm;
  createdIngredient: Ingredient;
  
  constructor(private shoppingListService: ShoppingListService) {}


  onAddedIngredient() {
    this.createdIngredient = new Ingredient(this.ingredientForm.value['name'], this.ingredientForm.value['amount']);
    this.shoppingListService.onAddedIngredient(this.createdIngredient);
  }

  

  onClear() {
    this.ingredientForm.reset();
  }
  
  // onAddedIngredient() {
  //   // this.createdIngredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);
  //   // this.shoppingListService.onAddedIngredient(this.createdIngredient);
  // }
}
