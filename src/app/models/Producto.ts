export class Producto {
    constructor(
        // tslint:disable-next-line:variable-name
        public _id: string,
        public titulo: string,
        public descripcion: string,
        public img: string,
        // tslint:disable-next-line:variable-name
        public precio_venta: number,
        // tslint:disable-next-line:variable-name
        public precio_compra: number,
        public stock: number,
        // tslint:disable-next-line:variable-name
        public id_categoria: string,
        public puntos: number,
    ){
    }
}
