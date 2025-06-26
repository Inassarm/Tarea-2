import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICategory} from "../../../interfaces";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() pCategoryList: ICategory[] = [];
  @Output() callUpdateModalMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

}
