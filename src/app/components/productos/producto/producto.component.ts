import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { GLOBAL } from '../../../services/GLOBAL';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public usuario;
  public productos;
  public url;
  public filtro;

  constructor(
    private productoService: ProductoService
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('identity'));
    this.getProductosList();
  }

  buscarProductos(searchForm){
    this.getProductosList(searchForm.value.filtros);
  }

  getProductosList(filtro = ''){
    this.productoService.getProductos(filtro).subscribe(
      (res) => {
        this.productos = res;
      }, err => {
      }
    );
  }

}
