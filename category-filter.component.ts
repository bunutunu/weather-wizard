import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  template: `
    <div class="mb-4">
      <label class="block font-medium mb-1">Filter by Category:</label>
      <select (change)="onFilter($event)" class="border px-2 py-1 w-full">
        <option value="">All</option>
        <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
      </select>
    </div>
  `
})
export class CategoryFilterComponent {
  @Output() filter = new EventEmitter<string>();
  categories = ['Work', 'Personal', 'Urgent'];

  onFilter(event: any) {
    this.filter.emit(event.target.value);
  }
}
