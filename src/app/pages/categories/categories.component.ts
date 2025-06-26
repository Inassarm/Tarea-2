import {Component, inject, ViewChild} from '@angular/core';
import {CategoryFormComponent} from "../../components/categories/category-form/category-form.component";
import {CategoryListComponent} from "../../components/categories/category-list/category-list.component";
import {PaginationComponent} from "../../components/pagination/pagination.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {ICategory, IProduct, ISportTeam} from "../../interfaces";
import {TeamService} from "../../services/team.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {ModalService} from "../../services/modal.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CategoryFormComponent,
        CategoryListComponent,
        PaginationComponent,
        ModalComponent
    ],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    public categoryList: ICategory[] = []
    public categoryService: CategoryService = inject(CategoryService);
    public fb: FormBuilder = inject(FormBuilder);
    public categoryForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['']
    });

    public modalService: ModalService = inject(ModalService);
    @ViewChild('editCategoryModal') public editProductModal: any;

    public authService: AuthService = inject(AuthService);
    public areActionsAvailable: boolean = false;
    public route: ActivatedRoute = inject(ActivatedRoute);

    constructor() {
        this.categoryService.getAll();
    }

    saveCategory(item: ICategory) {
        this.categoryService.save(item);
    }

    updateCategory(item: ICategory) {
        this.categoryService.update(item);
        this.modalService.closeAll();
        this.categoryForm.reset();
    }

    deleteCategory(item: ICategory) {
        this.categoryService.delete(item);
    }

    openEditCategoryModal(category: ICategory) {
        console.log("openEditCategoryModal", category);
        this.categoryForm.patchValue({
            id: JSON.stringify(category.id),
            name: category.name,
            description: category.description
        });
        this.modalService.displayModal('lg', this.editProductModal);
    }

}
