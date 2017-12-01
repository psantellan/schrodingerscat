
$(document).ready(function(){

	mostrarLibros();	//	Apenas se carga la pagina mostramos la lista de libros

	//Al hacer click sobre el link 'Administración' entramos del modo administración y
	//ocultamos la lista de libros
	$("#administrador").click(function(){
		$("#main-content #ofertas-del-dia").hide();
		$("#admin").show();
	});


	//Al hacer click sobre el boton 'Salir' salimos del modo administración y
	//volvemos a mostrar la lista de libros
	$("#boton-salir").click(function(){
		$("#main-content").show();
		$("#admin").hide();
		//mostrarLibros();	//	Mostramos nuevamente la lista de libros
		location.reload();
	});


});//ready


