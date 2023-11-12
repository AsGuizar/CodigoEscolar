class Nodo {
    constructor(numero){
        this.numero=numero;
        this.hizq=null;
        this.hder=null
    }
}
class arbolBinario {
    constructor(){
        this.raiz=null;
    }
    agregar(nuevo){
        if (this.raiz==null)
          this.raiz=nuevo;
    else 
        this_recAgregar(nuevo,this.raiz);
  }

  _recAgregar(nuevo,raizx){
    if (nuevo.numero<raizx.numero)
      if (raizx.hizq==null)
        raizx.hizq==nuevo
    else
      this._recAgregar(nuevo,raizx.hizq);
    else 
        if (raizx.hder==null)
          raizx.hder==nuevo
    else
      this._recAgregar(nuevo,raizx.hder);
  }
//---------------------------------------------------------
  buscar(valor) {
    return this._recBuscar(valor.thisraiz);
  }

  _recBuscar(valor, raizx) {
    if (raizx == null) {
        return null;
    }
    if (valor === raizx.numero) {
        return raizx;
    }
    if (valor < raizx.numero) {
        return this._recBuscar(valor, raizx.hizq);
    } else {
        return this._recBuscar(valor, raizx.hder);
    }
  }
}
//---------------------------------------------------------