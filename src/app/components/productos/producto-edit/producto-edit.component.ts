import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from '../../../services/GLOBAL';
import { Producto } from '../../../models/Producto';

// tslint:disable-next-line:no-empty-interface
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public producto;
  public id;
  public categorias;
  public imgSelected: string | ArrayBuffer;
  public url;
  public errorMessage;
  public successMessage;
  public file: File;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.cargarInformacion();
  }

  cargarInformacion(){
    this.productoService.getCategorias().subscribe(
      res => {
        this.categorias = res;
      }, err => {}
    );
    this.route.params.subscribe(
      params => {
        this.id = params.id;
      }
    );
    this.productoService.getProducto(this.id).subscribe(
      res => {
        this.producto = res;
        this.imgSelected = `${this.url}/producto/img/${this.producto.img}`;
      },
      err => {
      }
    );
  }

  actualizarProducto(productoForm){
    if (productoForm.valid){
      if (
        productoForm.value.titulo === '' ||
        productoForm.value.descripcion === '' ||
        productoForm.value.id_categoria === ''
      ) { return this.errorMessage = 'Todos los campos son obligatorios'; }

      this.productoService.actualizarProducto({
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        img: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        id_categoria: productoForm.value.id_categoria,
        puntos: productoForm.value.puntos,
        img_name : this.producto.img,
      }, this.id
       // productoForm.value.img === null ? false : true
      ).subscribe(
        response => {
         this.successMessage = 'Se actualizó el producto correctamente';
        //  this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
        },
        error => {
          this.errorMessage = 'Problemas al editar producto';
          // this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
        }
      );

    }
  }

  imgSeleccionada(event: HtmlInputEvent){
    if (event.target.files && event.target.files[0]){
      this.file = (event.target.files[0] as File);
      const reader = new FileReader();
      reader.onload = e => this.imgSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  limpiar(item){
    if (item === 1) { this.successMessage = null; }
    if (item === 2) { this.errorMessage = null; }
  }
}
