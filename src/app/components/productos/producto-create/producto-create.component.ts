import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';

// tslint:disable-next-line:no-empty-interface
interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto;
  public file: File;
  public imgSelected: string | ArrayBuffer;
  public categorias;
  public successMessage;
  public errorMessage: string;

  constructor(
    private productoServie: ProductoService
  ) {
    this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
   }

  ngOnInit(): void {
    this.productoServie.getCategorias().subscribe(
      res => {
        this.categorias = res;
      },
      err => {}
    );
  }

  crearProducto(productoForm){
    if (productoForm.valid){
      if (productoForm.value.titulo === '' || productoForm.value.descripcion === '' || productoForm.value.id_categoria === '') {
        this.errorMessage = 'Todos los campos son obligatorios';
        return;
      }
      this.productoServie.crearProducto({
        titulo: productoForm.value.titulo,
        descripcion: productoForm.value.descripcion,
        img: this.file,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        stock: productoForm.value.stock,
        id_categoria: productoForm.value.id_categoria,
        puntos: productoForm.value.puntos,
      }).subscribe(
        response => {
         this.successMessage = 'Se registro el producto correctamente';
         this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
         this.imgSelected = null;
        },
        error => {
          this.errorMessage = 'Problemas al crear producto';
          this.producto = new Producto('', '', '', '', 1, 1, 1, '', 1);
          this.imgSelected = null;
        }
      );
    }else{
      this.errorMessage = 'Formulario no valido';
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
