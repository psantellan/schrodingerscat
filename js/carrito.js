$(document).ready(function() {
	$("#shoppingcart").click(function() {
		if($("#carrito").is(":visible")){
			$("#ofertas-del-dia").show();
			$("#carrito").hide();
		}else{
			$("#carrito").show();
			$("#ofertas-del-dia, #admin").hide();
			mostrarCarro();	
		}
	});
});


function agregarAlCarro(id) {
	var lista = obtenerLista('listaCarro');
	var libros = obtenerLista('listaDeLibrosGuardados');

	lista.push(libros[id]);

	guardarLista('listaCarro', lista);
}

function mostrarCarro() {
	var lista = obtenerLista('listaCarro');

	var tabla = document.querySelector("#tabla-libros tbody");

	tabla.innerHTML = "";

	for(var k = 0; k < lista.length; k++){
		var filaLibro = tabla.insertRow(k);
		var titulo = filaLibro.insertCell(0);
		var autor = filaLibro.insertCell(1);
		var precio = filaLibro.insertCell(2);

		titulo.innerHTML = lista[k].tituloLibro;
		autor.innerHTML = lista[k].autorLibro;
		precio.innerHTML ="$ " + lista[k].precioLibro;

		tabla.appendChild(filaLibro);
	}
}