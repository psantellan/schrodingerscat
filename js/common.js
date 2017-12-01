//	Primero creamos una variable y la llamamos 'listaLibros'
//	Es un array que va a contener la lista de libros que se vayan agregando desde el formulario de administración.
//	Lo que hacemos con esta instrucción es 'decirle' a nuestra web que la listaLibros que acabamos de crear tome el valor
//	que le devuelve la función obtenerLista(). Esta función la creamos mas abajo en el código.
//	Cada vez que se actualice la página, el navegador va a leer todos los archivos que se incluyan en ella. Entonces va a leer
//	este archivo y va a obtener el contenido de 'listaDeLibrosGuardados' y lo va a guardar en listaLibros
var listaLibros = obtenerLista('listaDeLibrosGuardados');
var listaCarrito = obtenerLista('listaCarro');





/*Función que usamos para obtener el contenido de una lista específica guardada en el localStorage

	'obtenerLista' es el nombre de la función
	entre paréntesis le pasamos un valor, que en este caso es 'lista'.
	Este valor puede llamarse de cualquier manera. El nombre no es relevante.
	Pero sí hay que tener cuidado de usar ese mismo nombre DENTRO de la función.

*/
function obtenerLista(lista){	//Declaramos una función llamada 'obtenerLista' y le vamos a pasar el nombre de la lista que queremos que nos devuelva
	
	var lstAux;		//  Dentro de la función creamos una variable y la llamamos 'lstAux'. Esta variable nos va a ayudar a obtener el contenido de la lista
					//	que pasamos como parámetro a la función

	lstAux = JSON.parse(localStorage.getItem(lista));	//	De esta manera accedemos al localStorage y asignamos a lstAux el contenido que tenga 'lista'


	/*Esta es la parte donde interpretamos el contenido de la lista*/
	if(lstAux == null){		//	Esto equivale a preguntar: si lstAux es igual a null... 
							//	Es decir, si la lista está vacía ó todavía no se creó entonces el contenido es 'null'
		return []			//	Por lo tanto la función debe devolver un array vacío.

	}else{					//Sino, si la lista contiene al menos un elemento, entoces devuele el contenido de esta lista
		return lstAux;
	}
}//acá termina la función obtenerLista






/*
	Esta función la usamos para guardar un array en el localStorage.
	Recibe 2 parámetros: una clave y un valor asociado a dicha clave.
	Los pares clave-valor son muy útiles porque conociendo en nombre de la clave podemos tener el contenido del valor.

	Por ejemplo un par clave-valor puede ser ser el siguiente: (Nombre : Paula).
	Podríamos preguntar por 'Nombre' y obtener 'Paula'.
*/

function guardarLista(listaK, listaV){		//	listaK es la lista clave. Con el nombre que pasemos en este parámetro se va a guardar en
											//	el localStorage
											//	listaV es el contenido de dicha clave.
											//	cada vez que preguntemos por listaK, obtendremos listaV

	localStorage.setItem(listaK, JSON.stringify(listaV));	//	Esto es palabrerío del lenguaje javascript. Pero es necesario!
															//	Con setItem gaurdarmos el par clave-valor (listaK : listaV)
}//acá termina la función guardarLista





/*
	Esta función la usamos para obtener los valores agregados en el formulario
	que está en el panel de administración.
	
	Una vez que tenemos esos datos se los mandamos a la funcion agregarLibro

*/
function guardarNuevoLibro(){

	/*
		Usamos jQuery para ahorrarnos codigo y facilitar la escritura y lectura deL mismo
		
		Ejemplos
		$("#nombre") con esto accedemos al objeto que tiene un id="nombre" 

		$(".miclase") accedemos al objeto (o los objetos) que tiene(n) class="miclase"
	*/

	var titLibro = $("#titulo").val();			//	Guardamos el contenido del textbox que tiene id="titulo" y lo guardamos en titLibro
	var autLibro = $("#autor").val();			//	Guardamos el contenido del textbox que tiene id="autor" y lo guardamos en autLibro
	var preLibro = $("#precio").val();			//	Guardamos el contenido del textbox que tiene id="precio" y lo guardamos en preLibro
	
	agregarLibro(titLibro, autLibro, preLibro);	//	'Llamamos' a la función agregarLibro y le pasamos por parámetro los valores que obtuvimos anteriormente
}//acá termina la función guardarNuevoLibro



/*
	Esta función la usamos para obtener agregar un nuevo libro en la listaLibros

*/
function agregarLibro(titulo, autor, precio) {
	
	//	Esta función recibe 3 paremetros: 'titulo', 'autor', 'precio'
	//	Éstos vienen de la función guardarNuevoLibro


	//	Ahora creamos un objeto y le cargamos los datos que nos dan en los parámetros
	//	este nuevoLibro es una variable de tipo JSON.
	//	es muy util para almacenar parejas del tipo clave-valor.

	var nuevoLibro = {
		tituloLibro : titulo,	//	El 'titulo' que viene en el parámetro lo guardamos en tituloLibro
		autorLibro : autor,		//	El 'autor' que viene en el parámetro lo guardamos en autorLibro
		precioLibro : precio 	//	El 'precio' que viene en el parámetro lo guardamos en precioLibro
	};


	//	Una vez que tenemos creado nuestro libro y que se hayan cargado los datos asociados al mismo
	//	Hecho esto guardamos ese libro en nuestra listaLibros.
	//	Con push(nuevoLibro) lo que hacemos es agregar el nuevoLibro al final de nuestra lista
	listaLibros.push(nuevoLibro);
	guardarLista('listaDeLibrosGuardados', listaLibros);	// Y finalmente guardamos la listaLibros con la clave 'listaDeLibrosGuardados'
}//acá termina la función agregarLibro


/*Función que usamos para mostrar los libros que hay en la listaLbros*/
function mostrarLibros(){
	var listaL = obtenerLista('listaDeLibrosGuardados');	// 	Obtenemos la lista de libros guardados

	if(listaL.length > 0){	// Preguntamos si el largo de la lista es mayor a 0, lo que equivale a preguntar si la lista no está vacía
		//	si hay algun libro para mostra entoces lo hacemos
		
		$("#main-content").empty();	//Borramos el contenido principal para poder mostrarlo nuevamente con los cambios realizados

		for(var i = 0; i < listaL.length; i++){
			var contendioPpal = $("#main-content");	// Identificamos el contenido principal el el index.html
													// Acá es donde vamos a mostrar los libros
			var bookCont = $(".ofertas-contanier");	// Agregamos un nuevo contenedor para un nevo libro
			var nuevoli = $("<li id='"+i+"'></li>");
			nuevoli.append("<div><img class='imagen' src='Imágenes varias/portada.jpg' width='100px' height='155px'></div>");	//	Agregamos una imagen al contenedor principal.
																									//	Luego vemos cómo agregar una imagen seleccionada.
			



			var descLibro = $("<div class='descripcion-imagen'></div>");	//	Variable para agregar las descripciones del libro
			descLibro.append("<span class='titulo'>"+ listaL[i].tituloLibro +"</span><br>");	//	Agregamos el titulo
			descLibro.append("<span class='autor'>"+ listaL[i].autorLibro +"</span><br>");		//	Agregamos el autor
			descLibro.append("<span class='info'><span class='price'>$ "+ listaL[i].precioLibro +"</span></span><br>");	//	Agregarmos el precio
			descLibro.append('<input class="cart_add" type="button" name="my-add-button" value="Agregar al carrito" class="button tip" onclick="agregarAlCarro('+i+')">');																					//	Esta es por defecto
			nuevoli.append(descLibro);									
			bookCont.append(nuevoli); 

			/*
				Esto funciona así:
				Si la lista no está vacía la recorremos con la instrucción for.

				Por ejemplo:
				el for arranca con la variable i en 0, entonces cuando hacemos listaL[i], en realidad estamos haciendo listaL[0].
				Así sigue avanzando de a una posición en el array (con el i++) hasta llegar al final.
				De esta manera hace una pasada completa por la lista mostrando todos los libros que hay.
				
				Con listaL[i].tituloLibro estamos accediendo al titulo que tiene el libro que está en la posición i del array listaLibros
			
			*/
		}	
	}
}//acá termina mostrarLibros

/*
	
*/

