class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.izquierda = None
        self.derecha = None

def construir_arbol(expresion):
    pila = []
    operadores = set(['+', '-', '*', '/'])

    for caracter in expresion:
        if caracter.isdigit():
            pila.append(Nodo(int(caracter)))
        elif caracter in operadores:
            nodo = Nodo(caracter)
            nodo.derecha = pila.pop()
            nodo.izquierda = pila.pop()
            pila.append(nodo)

    return pila[0]

def recorrido_preorder(nodo):
    if nodo:
        print(nodo.valor, end=' ')
        recorrido_preorder(nodo.izquierda)
        recorrido_preorder(nodo.derecha)

def recorrido_postorder(nodo):
    if nodo:
        recorrido_postorder(nodo.izquierda)
        recorrido_postorder(nodo.derecha)
        print(nodo.valor, end=' ')

def resolver_preorder(nodo):
    if nodo:
        if isinstance(nodo.valor, int):
            return nodo.valor
        else:
            izquierda = resolver_preorder(nodo.izquierda)
            derecha = resolver_preorder(nodo.derecha)

            if nodo.valor == '+':
                return izquierda + derecha
            elif nodo.valor == '-':
                return izquierda - derecha
            elif nodo.valor == '*':
                return izquierda * derecha
            elif nodo.valor == '/':
                return izquierda / derecha

def resolver_postorder(nodo):
    if nodo:
        if isinstance(nodo.valor, int):
            return nodo.valor
        else:
            derecha = resolver_postorder(nodo.derecha)
            izquierda = resolver_postorder(nodo.izquierda)

            if nodo.valor == '+':
                return izquierda + derecha
            elif nodo.valor == '-':
                return izquierda - derecha
            elif nodo.valor == '*':
                return izquierda * derecha
            elif nodo.valor == '/':
                return izquierda / derecha

if __name__ == "__main__":
    expresion = input("Ingrese la expresión aritmética: ")
    
    # Construir el árbol binario a partir de la expresión
    arbol = construir_arbol(expresion)

    # Mostrar el resultado del recorrido preorder y postorder
    print("\nRecorrido Preorder:")
    recorrido_preorder(arbol)

    print("\nRecorrido Postorder:")
    recorrido_postorder(arbol)

    # Resolver expresión en preorder
    resultado_preorder = resolver_preorder(arbol)
    print("\nResultado de la expresión en Preorder:", resultado_preorder)

    # Resolver expresión en postorder
    resultado_postorder = resolver_postorder(arbol)
    print("Resultado de la expresión en Postorder:", resultado_postorder)
