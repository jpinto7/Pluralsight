import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  moduleId: module.id,
  templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService) {}

  ngOnInit(): void {
    let id = +this._route.snapshot.params['id'];
    this.pageTitle += `: ${id}`;
    this._productService.getProduct(id).subscribe(this.onSuccess, this.onError);
  }

  private onSuccess = (product: IProduct) => this.product = product

  private onError = (error: any) => this.errorMessage = error

  onBack(): void {
    this._router.navigate(['/products']);
  }
}
