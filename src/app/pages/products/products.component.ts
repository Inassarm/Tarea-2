import {Component, inject, ViewChild} from '@angular/core';
import {ProductFormComponent} from "../../components/products/product-form/product-form.component";
import {ProductListComponent} from "../../components/products/product-list/product-list.component";
import {PaginationComponent} from "../../components/pagination/pagination.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {SportTeamFormComponent} from "../../components/sport-team/sport-team-form/sport-team-form.component";
import {SportTeamListComponent} from "../../components/sport-team/sport-team-list/sport-team-list.component";
import {IProduct, ISportTeam} from "../../interfaces";
import {TeamService} from "../../services/team.service";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [
        ProductFormComponent,
        ProductListComponent,
        PaginationComponent,
        ModalComponent
    ],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export class ProductsComponent {
    public productList: IProduct[] = []
    public productService: ProductService = inject(ProductService);
    public fb: FormBuilder = inject(FormBuilder);
  public productForm = this.fb.group({
    id: [''],
    name: [''],
    description: [''],
    price: [''],
    stockQuantity: [''],
    category: this.fb.group({
      id: ['']
    })
  });
  public modalService: ModalService = inject(ModalService);
  @ViewChild('editProductModal') public editProductModal: any;

  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    this.productService.getAll();
  }

  saveProduct(item: IProduct) {
    this.productService.save(item);
  }

  updateProduct(item: IProduct) {
    this.productService.update(item);
    this.modalService.closeAll();
    this.productForm.reset();
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }

  openEditProductModal(product: IProduct) {
    console.log("openEditProductModal", product);
    this.productForm.patchValue({
      id: JSON.stringify(product.id),
      name: product.name,
      description: product.description,
      price: JSON.stringify(product.price),
      stockQuantity: JSON.stringify(product.stockQuantity),
      category: product.category as any
    });
    this.modalService.displayModal('lg', this.editProductModal);
  }

}
