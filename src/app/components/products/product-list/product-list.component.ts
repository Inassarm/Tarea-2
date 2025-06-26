import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {IProduct} from "../../../interfaces";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    @Input() pProductList: IProduct[] = [];
    @Output() callUpdateModalMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
    @Output() callDeleteMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
    public authService: AuthService = inject(AuthService);
    public areActionsAvailable: boolean = false;
    public route: ActivatedRoute = inject(ActivatedRoute);
    public productsService: ProductService = inject(ProductService);

    ngOnInit(): void {
        this.authService.getUserAuthorities();
        this.route.data.subscribe(data => {
            this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
        });
    }

}
