import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }
  pageTitle: string = 'Dash';
  errorMessage = '';
  product: IProduct | undefined;


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    if(id){
      this.getProduct(id);
    }
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }

  getProduct(id: number): void{
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });

  }
}
