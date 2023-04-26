import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  @Output() addedIngredient = new EventEmitter<{ingredientName: string, ingredientAmount: number}>();

  onAddedIngredient() {
    this.addedIngredient.emit({
      ingredientName: this.nameInput.nativeElement.value,
      ingredientAmount: this.amountInput.nativeElement.value
    })
  }

}
