import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, map, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    constructor(private http: HttpClient){
        
    }
    private productUrl = 'api/products/products.json';

    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          catchError(this.handleError)
        )
    }

    getProduct(id: number): Observable<IProduct | undefined>{
      return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
    }

    private handleError(err: HttpErrorResponse){
      let errorMessage = `an Error occured: ${err.error.message}`;
      console.log(errorMessage);
      return throwError(() => errorMessage);
    }
}