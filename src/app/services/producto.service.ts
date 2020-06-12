import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { map } from 'rxjs/operators';
import { Producto } from '../models/Producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url;
  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  getProductos(filtro): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(`${this.url}/producto/list/${filtro}`, {headers: headers}).pipe(
      map((res: any) => {
        return res.productos;
      })
    );
  }

  getCategorias(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(`${this.url}/categoria/list`, {headers: headers}).pipe(
      map((res: any) => {
        return res.categorias;
      })
    );
  }

  crearProducto(producto): Observable<any>{
    const fd = new FormData();
    fd.append('titulo', producto.titulo);
    fd.append('descripcion', producto.descripcion);
    fd.append('img', producto.img);
    fd.append('precio_compra', producto.precio_compra);
    fd.append('precio_venta', producto.precio_venta);
    fd.append('stock', producto.stock);
    fd.append('id_categoria', producto.id_categoria);
    fd.append('puntos', producto.puntos);

    return this.http.post(`${this.url}/producto`, fd);
  }

  actualizarProducto(producto, id): Observable<any>{
    const fd = new FormData();
    fd.append('titulo', producto.titulo);
    fd.append('descripcion', producto.descripcion);
    fd.append('img', producto.img);
    fd.append('precio_compra', producto.precio_compra);
    fd.append('precio_venta', producto.precio_venta);
    fd.append('stock', producto.stock);
    fd.append('id_categoria', producto.id_categoria);
    fd.append('puntos', producto.puntos);

    // const url = `${this.url}/producto/edit/${id}${img ? '/' + producto.img : ''}`;
    const url = `${this.url}/producto/edit/${id}/${producto.img_name}`;

    return this.http.put(url, fd);
  }

  getProducto(id): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.get(`${this.url}/producto/${id}`, {headers: headers}).pipe(
      map((res: any) => {
        return res.producto;
      })
    );
  }
}
