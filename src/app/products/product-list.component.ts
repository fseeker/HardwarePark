import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscription } from "rxjs";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService){

  }

  pageTitle: string = "Product-List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  imageView = "Show Image";
  isImageShowed = false;
  errorMessage = '';
  sub!: Subscription;
  
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.filter(value)
  }


  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  toggleImage(): void {
    this.isImageShowed = !this.isImageShowed;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: err => this.errorMessage = err
    });
    this.listFilter = '';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  filter(value: string): IProduct[] {
    value = value.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(value)
    )
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List: " + message;
  }
}