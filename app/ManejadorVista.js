/*                
                      ACLARACIÓN: 

    El objetivo de este pequeño proyecto NO ha sido:

        -Seguir un patrón de diseño correcto (por ejemplo, MVC).
        -Realizar un trabajo de UI/UX y frontend adecuado.
        -Hacer el proyecto responsive.
    
    No obstante, en lo que me he centrado principalmente ha sido en:

        -Practicar y entender la programación orientada a objetos en JavaScript, hecho importante para el estudio futuro de FrameWorks de este lenguaje (aunque es cierto que no he incluido herencia).
        -Determinar el por qué de ciertas situaciones al añadir eventos al programa (uso de la palabra resevada this, uso de la función bind para preconfigurar parámetros).
        -Entender la generación de objetos de HTML mediante Javascript (document.createElement('elementName')).
        -Entender las distintas formas de seleccionar con JS objetos HTML.
        -Navegar por los objetos del DOM (querySelector, getElementByID, previousElementSibling, etc).
        -Incluir Objetos HTML dentro de otros objetos HTML con el método append().
        -Practicar arrow functions propias de ES6, por ejemplo en funciones como filter o findIndex.
        -Entender el funcionamiento de propiedades y métodos estáticos en las clases implementadas.
        -El concepto de objeto, la modificación de los datos del mismo gracias la referencia en memoria (puntero).
        -Conectar todas las funcionalidades de la aplicación en una función controladora (App, en este caso). 
            El ejemplo más claro es que dentro del método init de la clase App se conectan los botones, 
            los modales y los botones de Volver, además del resto de funcionalidades de la aplicación.
        -Practicar estructura de datos como Array, Objetos y Map. Por ejemplo, para esta última estructura de datos he pensado en la creación de un «mapa de conexiones»
            que ha sido utilizado dentro de la App para dirigir hacia una vista u otra dependiendo del botón que se pulse, es decir, para una id de un botón determinada muestro el 
            contenedor correspondiente dentro del mapa (o diccionario, en otro lenguajes de programación), ya que estas estructuras de datos se basan en la existencia del par KEY => VALUE.
            gracias a este mapa de conexiones he podido crear una single page application (SPA) con solo uno archivo HTML (obviamente esto se podría haber mejorado).
        -Mostrar / ocultar elementos del DOM dependiendo de la vista en la que el usuario se encuentre.
        -Limpiar elementos del DOM cuando sea necesario (ejemplo: cuando se hace una segunda petición a la API  de las recetas, los datos de la primera petición son limpiados)
        -Practicar las peticiones HTTP mediante AJAX, tratando a su vez con la asincronía del mismo con la API de las promesas de JavaScript (clase Promise).
            IMPORTANTE: No está bien implementado ya que no compruebo el fallo en la petición HTTP. 
        -En relación con el punto anterior, recoger datos en formato JSON de una API externa tras realizar la petición y mostrarlos en el navegador de la forma deseada.
        -Como ha sido comentado en alguno de los puntos anteriores, uno de los objetivos (reconozco que para evitar usar varias paginas html) era intentar realizar un SPA.
            Es cierto que el proyecto no es grande y que en realidad todo se hubiedo podido incluir en la misma vista. No obstante lo ideal es que esto no ocurra y que exista cierta
            navegabilidad entre las diferentes funcionalidades de la aplicación. 

    ¿Y qué es lo que propongo?
        -Mejorar la información que la aplicación proprociona a la hora de ELIMINAR y MODIFICAR un alimento que tengamos en nuestra despensa. Con esto me refiero a que de alguna manera el programa
            informe al usuario de lo que acaba de hacer.
        -Añadir la funcionalidad de confirmar la modificación y la eliminación de los alimentos.
        -Modularizar este script (ManejadorVista.js) partiéndolos en varios scripts. Para ello se debe trabajar con módulos e ir importándolos en el orden adecuado
            normalmente por cada clase hay un archivo .js .
        -Investigar sobre AJAX (es decir, XMLHttpRequest) e implementar bien la petición !!!
        -Refactorizar código repetido, ya que puede ser mejorado completamente.
        -Rehacer el proyecto completo siguiendo un desarrollo más adecuado e inteligente.
        -Buscar qué es el event bubbling en javascript y determinar puede ser implementado en el proyecto.
        -Mejorar el proyecto en todos los ámbitos:
            MVC
            Crear el backend con Node o Java 
            Añadir base de datos para persistencia de datos
            Mejorar el diseño, aunque los colores de Andalucía sean bonitos
            Añadir más funcionalidades (¿Crear un menú semanal / Diario?)
            Hacer el proyecto responsive
            etc etc etc


*/

class Alimento {
    static id = 2;
    constructor(nombre, lugar, cantidad){
        this.id = ++Alimento.id;
        this.nombre = nombre;
        this.lugar = lugar;
        this.cantidad = cantidad;
    }
}
/**
 * @class ManejadorVista
 * @classdesc Poco que decir de esta clase. Nos permite mostrar y ocultar elementos del DOM para cambiar la vista.
 */
class ManejadorVista {
    static ocultarContenedorPrincipal(){
        document.getElementById('contenedor-principal').classList.add('oculto');
    }
    static mostrarContenedorPrincipal(){
        document.getElementById('contenedor-principal').classList.remove('oculto');

    }
    static renderVista(idElementoSeleccionado, idElementoAMostrar){
        console.log('DENTRO DE RENDER VIST',idElementoSeleccionado,idElementoAMostrar)
        document.getElementById(idElementoSeleccionado).classList.add('oculto');
        document.getElementById(idElementoAMostrar).classList.remove('oculto');
        
    }
}

/**
 * @class ModalGenerator
 * @classdesc permite generar los Objetos HTML que funcionan como modal dentro de la App
 * @constructor
 *    @param1 , id => id obtenida del mapa de conexiones
 *    @param2 , contenedorActual => recibe el id guardado en App.idVistaActual
 * 
 * @function generarModal() => genera el modal adecuado en función del tipo del objecto ModalGenerator que se haya construido
 * @function controladorCerrarModal(id) => Se activan ambos botones de cerrar modal dentro del mismo al hacer click en ellos, llamadno a la funcion cerrarModal
 * @function cerrarModal() => se selecciona el modal con la palabra reservada this, se elimina y se retira la clase active del backdrop para permitir a la app ser funcional de nuevo
 * @function enviarRegistro(id) => se procesan los datos del formulario de registro de alimentos y se añaden de nuevo al array de alimentos o se actualiza el valor de la cantidad del alimetno en el caso
 *                                  de que este ya exista
 * @function conectarBotonModificar() => se añade el listener al botón de ¡Hecho! que lanzará a la función modificarAlimento
 * @function modificarAlimento => se recogen los datos, se busca el índice del elemento a modificar en el array y se setean los datos de ese elemento.
 * @function conectarBotonBorrar() => se añade el listener a los botones de BORRAR del modal de eliminar alimento, los cuales lanzarán a la función borrar
 * @function borrar => con el id del botón (correspondiente al id del elemento del array) se obtiene el indice del elemento dentro del array y luego se elimina con el método splice. Se elimina el elemento del DOM
 *                      y se desactiva el backdrop
 * 
 * 
 * 
 * 
 */
class ModalGenerator {
    constructor(id, contenedorActual){
        this.id = id;
        if(id === 'modalRegistrarComida'){
            this.tipo = 'registro';

        }else if(id === 'modalModificarComida'){
            this.tipo = 'modificar';

        } else{
            this.tipo = 'eliminar';
        }
        this.contenedorActual = contenedorActual;
        this.generarModal();
       
    }
    generarModal(){
        //SELECCIONAMOR EL CONTENEDOR QUE ESTAMOS MOSTRANDO con el objetivo de meterlo ahí dentro
        const contenedorActual = document.getElementById(this.contenedorActual);
        //CREAMOS EL DIV DEL MODAL. LE DEBEMOS AÑADIR MÁS ELEMENTOS
        const div = document.createElement('div');
        div.classList.add('modal');
        div.id = this.id;
        const buttonCerrar = document.createElement('button');
        buttonCerrar.classList.add('btnCerrar');
        buttonCerrar.textContent = 'X';
        div.append(buttonCerrar);
        //CREAMOS EL TITULO
        const h2 = document.createElement('h2');
        if(this.tipo === 'registro'){
            h2.textContent = 'Registrar';
            
        } else if(this.tipo === 'modificar'){
            h2.textContent = 'Modificar';
            if(App.arrayAlimentos.length < 1){
                alert('NO HAY ALIMENTOS DISPONIBLES');
                
                return; 
            }
        } else {
            h2.textContent = 'Eliminar';
            if(App.arrayAlimentos.length < 1){
                alert('NO HAY ALIMENTOS DISPONIBLES');
                
                return; 
            }
        }
        div.append(h2);
        //CREAMOS EL CUERPO DEL MODAL
        const cuerpo = document.createElement('div');
        if(this.tipo === 'registro'){
            cuerpo.classList.add('modalRegistrar')
            const label1 = document.createElement('label');
            label1.textContent = 'Nombre';
            const inputNombre = document.createElement('input');
            inputNombre.id = 'registrarNombre';
            cuerpo.append(label1);
            cuerpo.append(inputNombre)

            const label2 = document.createElement('label');
            label2.textContent = 'Lugar';
            const inputLugar = document.createElement('input');
            inputLugar.id = 'registrarLugar';
            cuerpo.append(label2);
            cuerpo.append(inputLugar)

            const label3 = document.createElement('label');
            label3.textContent = 'Cantidad';
            const inputCantidad = document.createElement('input');
            inputCantidad.id = 'registrarCantidad';
            inputCantidad.setAttribute('type','number');
            cuerpo.append(label3);
            cuerpo.append(inputCantidad)


            const inputSubmit = document.createElement('input');
            inputSubmit.setAttribute('type', 'submit');
            inputSubmit.id = 'btnEnviarRegistro';
            inputSubmit.value = 'Enviar';
            inputSubmit.classList.add('btnEnviarRegistro')
            const inputCerrar = document.createElement('button');
            inputCerrar.textContent = 'Cancelar';
            inputCerrar.classList.add('btnCerrar');
            inputCerrar.classList.add('btnCerrarAnchura')

            cuerpo.append(inputSubmit)
            cuerpo.append(inputCerrar);

        }else if(this.tipo === 'modificar'){
            App.arrayAlimentos.forEach(e => {
                const alimento = document.createElement('div');
                alimento.classList.add('contenedor-alimento');
                const span = document.createElement('span');
                span.textContent = e.id + ". ";
                alimento.append(span);
                const nombre = document.createElement('input');
               // nombre.id = 'modificarAlimento';
                nombre.setAttribute('readonly','');
                nombre.value = e.nombre;
                
                alimento.append(nombre);
                const lugar = document.createElement('input');
                //lugar.id = 'modificarLugar';
                lugar.setAttribute('type','text');
                lugar.value = e.lugar;
                alimento.append(lugar);

                const cantidad = document.createElement('input');
                //cantidad.id = 'modificarCantidad';
                cantidad.setAttribute('type','number');
                cantidad.value = parseInt(e.cantidad);
                alimento.append(cantidad);

                const hecho = document.createElement('button');
                hecho.textContent = '¡Hecho!';
                hecho.id = e.id;
                hecho.classList.add('btnModEliminar')

                alimento.append(hecho);
                this.conectarBotonModificar(hecho);
                cuerpo.append(alimento);

            })
            const inputCerrar = document.createElement('button');
            inputCerrar.textContent = 'Cancelar';
            inputCerrar.classList.add('btnCerrar');
            cuerpo.append(inputCerrar);
        }
        else{
            App.arrayAlimentos.forEach(e => {
                const alimento = document.createElement('div');
                alimento.classList.add('contenedor-alimento');
                const span = document.createElement('span');
                span.textContent = e.id + ". ";
                alimento.append(span);
                const nombre = document.createElement('input');
               // nombre.id = 'modificarAlimento';
                nombre.setAttribute('readonly','');
                nombre.value = e.nombre;
                
                alimento.append(nombre);
                const lugar = document.createElement('input');
                //lugar.id = 'modificarLugar';
                lugar.setAttribute('readonly','');
                lugar.value = e.lugar;
                alimento.append(lugar);

                const cantidad = document.createElement('input');
                //cantidad.id = 'modificarCantidad';
                cantidad.setAttribute('readonly','');
                cantidad.value = parseInt(e.cantidad);
                alimento.append(cantidad);

                const borrar = document.createElement('button');
                borrar.textContent = '¡BORRAR!';
                borrar.id = e.id;
                borrar.classList.add('btnModEliminar')
                console.log(borrar)
                alimento.append(borrar);
                this.conectarBotonBorrar(borrar);
                cuerpo.append(alimento);

            })
            const inputCerrar = document.createElement('button');
            inputCerrar.textContent = 'Cancelar';
            inputCerrar.classList.add('btnCerrar');
            cuerpo.append(inputCerrar);
        }
        div.append(cuerpo);
        contenedorActual.append(div);
        document.querySelector('.backdrop').classList.add('active');
        this.controladorCerrarModal(this.id);
        if(this.tipo === 'registro'){
            this.enviarRegistro('btnEnviarRegistro');
        }
    }
    controladorCerrarModal(id) {
        const botonCierre = document.querySelectorAll('.btnCerrar');
        botonCierre.forEach(btn => {
            btn.addEventListener('click', this.cerrarModal.bind(id))
        })
    }
    enviarRegistro(id){
    
        document.getElementById(id).addEventListener('click', e => {
            let nombre = document.getElementById('registrarNombre')
            let lugar =   document.getElementById('registrarLugar')
            let cantidad = document.getElementById('registrarCantidad')
            //EXTRAEMOS LA LISTA DE ALIMENTOS QUE HAY EN LA CLASE APP. RECORDEMOS QUE ES UNA LISTA ESTATICA
            const alimento = new Alimento(nombre.value, lugar.value, parseInt(cantidad.value));
           // let arrayAlimentos = App.arrayAlimentos;
           let nombreMinus = nombre.value.toLowerCase();
            let array = App.buscarAlimento(nombreMinus);
            //console.log(array)
            if(array.length > 0){
                let index = App.arrayAlimentos.findIndex(e => e.nombre.toLowerCase() === nombreMinus);
                ///alert(index)
                App.arrayAlimentos[index].cantidad += parseInt(cantidad.value)
                Alimento.id--;
            }else{
                App.arrayAlimentos.push(alimento);
            }
        
            alert(`Has guardado ${cantidad.value} ${nombre.value} en ${lugar.value} !!!!`);
            nombre.value = "";
            lugar.value = "";
            cantidad.value = "";

            
        });
    }
    conectarBotonModificar(btnModificar){
        btnModificar.addEventListener('click' , this.modificarAlimento)
    }
    modificarAlimento(){
        const cantidad = this.previousElementSibling
        const lugar = cantidad.previousElementSibling;
        const nombre = lugar.previousElementSibling;
        let index = App.arrayAlimentos.findIndex(e => e.nombre === nombre.value)
        let alimento = App.arrayAlimentos[index];
        //console.log(index,cantidad.value)
        //  console.log(alimento, cantidad, lugar, nombre)
        alimento.cantidad = parseInt(cantidad.value);
        alimento.nombre = nombre.value;
        alimento.lugar = lugar.value;
    }
    conectarBotonBorrar(btnBorrar){
        btnBorrar.addEventListener('click', this.borrar)
    }
    borrar(){
        const id = this.id;
        let index = App.arrayAlimentos.findIndex(e => e.id === parseInt(id))
        App.arrayAlimentos.splice(index, 1);
        this.parentElement.parentElement.parentElement.remove();
        document.querySelector('.backdrop').classList.remove('active');

    }

    cerrarModal() {
        let element = document.getElementById(this);
        element.remove();
        document.querySelector('.backdrop').classList.remove('active')
    }

}

/** 
        @class App
        @classdesc una clase para gobernarlas a todas.

        @function arrayAlimentos propiedad estática que guarda los alimentos de la aplicación

        @function arrayIdBotones => propiedad estática que guarda las id de los botones del DOM 

        @function idVistaActual => propiedad estática que guarda en qué vista está el usuario.
                          Para ello guarda el id del contenedor del HTML que debe mostrar 

        @function idVistaAnterior => propiedad estática que guarda cuál fue la vista anterior.

        @function generarConexiones => método que devuelve el mapa de conexiones. Se utilizará para dirigir la vista al lugar adecuado.

        @function volverAtras => método que permite activar la funcionalidad de volver a la vista anterior utilizando para ello las propiedades
                        idVistaActual e idVistaAnterior, las cuales será intercambiadas para el renderizado.

        @function renderAlimentos => método que 'pinta' en el navegador los alimentos guardados en arrayAlimentos

        @function requestToSpoonAPI =>Realiza la petición a la API spoonacular. @param value es la entrada de texto tecleada en el input. @returns Promise, que contiene el JSON en el caso de éxito en la conexion    
        
        @function buscarReceta => limpia el DOM de anteriores búsquedas, captura el valor de la entrada del input de la búsqueda de recetas,
                         realiza el request de la API y extrae los datos de interés para mostrarlos en el DOM
        
        @function addRenderVista => Muestra la vista correspondiente a la ID del boton pulsado y si es necesario añade funcionalidad extra en función de donde se encuentre el usuario

        @function conectarBotonesNavegacion => recorre el array con el id de los botones para seleccionar cada elemento y añadir su correspondiente listener. En el caso de un número 
                                      relativamente grande de botones sobrecargaríamos el DOM de eventos y habría que recurrir a otra estrategia por motivos de performance
                                      
        @function conectarVueltaAtras => permite que los botones de volver funcionen correctamente

        @function conectarModales => recorremos el ID de cada botón que lanza el modal cargado directamente dentro de la función y le añadimos el listener correspondiente al hacer click. La función que se activa
                            es renderModal, a la cual se le pasa el id del botón que ha sido pulsado con bind (ESTE HECHO ES ESENCIAL)

        @function renderModal => obtenemos el id del modal que vamos a generar gracias al mapa de conexiones, utilizando la palabra reservada this para acceder al id del boton que ha sido pulsado.
                        se genera el modal gracias al constructor de ModalGenerator, que recibe la id del modal y la vista actual (IMPORTANTE)

        @function buscarAlimento => busca un alimento dentro de arrayAlimentos que coincida con el nombre pasado a la función. @returns un array con las coincidencias que cumplan la condición.

        @function init => método que activa la funcionalidad de todos los botones de la aplicación y por tanto de todos lo métodos de la clase App, ModalGenerator, ManejadorVista y Alimento

    **/
class App {
    
    static arrayAlimentos = [{id: 1, nombre:'Huevos', lugar: 'Frigorifico', cantidad: 12},
                             {id: 2, nombre:'Filete de ternera', lugar: 'Frigorifico', cantidad: 2} ];

    static arrayIdBotones = ['tu-despensa-btn', 'recetas-btn','btnMostrarComida'];
    static idVistaActual = 'contenedor-index';
    static idVistaAnterior = '';
    static generarConexiones() {
        let mapa = new Map();
        mapa.set('tu-despensa-btn', 'contenedor-menu-despensa');
        mapa.set('recetas-btn', 'contenedor-menu-recetas');
        mapa.set('btnMostrarComida', 'contenedor-menu-despensa-alimentos');
        mapa.set('btnRegistrarComida', 'modalRegistrarComida');
        mapa.set('btnModificarComida', 'modalModificarComida');
        mapa.set('btnEliminarComida', 'modalEliminarComida');
        return mapa;
    }
    
   
    static volverAtras(){
       
        ManejadorVista.renderVista(App.idVistaActual, App.idVistaAnterior);
        let vistaAnterior = App.idVistaAnterior;
        let vistaActual = App.idVistaActual;
        App.idVistaActual = vistaAnterior;
        App.idVistaAnterior = vistaActual;
        if(App.idVistaAnterior === 'contenedor-menu-despensa-alimentos'){
            App.idVistaAnterior = 'contenedor-index';
            document.getElementById('control-alimentos').remove();
        }
       
        if(App.idVistaActual === 'contenedor-index'){
            ManejadorVista.ocultarContenedorPrincipal();
        }

        
     
    }
    static renderAlimentos() {
        const cuerpo = document.createElement('div');
        cuerpo.classList.add('control-alimentos');
        cuerpo.id = 'control-alimentos';
        const headers = document.createElement('div');
        headers.classList.add('contenedor-render-alimento');
        const nombreH = document.createElement('p');
        // nombre.id = 'modificarAlimento';            
         nombreH.textContent = 'NOMBRE';
         const lugarH = document.createElement('p');
         lugarH.textContent = 'LUGAR';
         const cantidadH = document.createElement('p');
         cantidadH.textContent = 'CANTIDAD';
         headers.append(nombreH);
         headers.append(lugarH);
         headers.append(cantidadH);
         cuerpo.append(headers);
       

        App.arrayAlimentos.forEach(e => {
            const alimento = document.createElement('div');
            alimento.classList.add('contenedor-render-alimento');
            
            const nombre = document.createElement('p');
          
            nombre.textContent = e.nombre;
            alimento.append(nombre);

            const lugar = document.createElement('p');
           
        
            lugar.textContent = e.lugar;
            alimento.append(lugar);

            const cantidad = document.createElement('p');
           
            cantidad.textContent = e.cantidad;
            alimento.append(cantidad);
            
            cuerpo.append(alimento);

        });
        document.getElementById(App.idVistaActual).append(cuerpo);
    }

    static requestToSpooncularAPI(value) {
      
        const promise = new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            let apiKey = '126937432de448308d17cef16fc5fb97';
            let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${value}`;
            xhr.open('GET',url);
            xhr.responseType = 'json';
            xhr.onload = function (){
                resolve(xhr.response);
            }

            xhr.send();
        });
        return promise;
       
    }

    static buscarReceta(){
        let c = Array.from(document.getElementsByClassName('contenedor-busqueda-alimento'))
        c.forEach(e=>{
            e.remove();
        })
        let value = this.previousElementSibling.value;
        App.requestToSpooncularAPI(value).then(data => {
            console.log(data);
            const busqueda = document.querySelector('.busqueda');
            data.forEach(el =>{
                const div = document.createElement('div');
                div.classList.add('contenedor-busqueda-alimento');
                const img = document.createElement('img');
                img.setAttribute('src', el.image);
                div.append(img);
                const h3 = document.createElement('h3');
                h3.textContent = el.title;
                div.append(h3);

                const divIngredientes = document.createElement('div');
                divIngredientes.classList.add('ingredientes');
                el.usedIngredients.forEach(ingredient => {

                    const p = document.createElement('p');
                    p.textContent = `${ingredient.original}`;
                    divIngredientes.append(p);

                })
                el.missedIngredients.forEach(ingredient => {
                    const p = document.createElement('p');
                    p.textContent = `${ingredient.original}`;
                    divIngredientes.append(p);
                });
                div.append(divIngredientes);
                busqueda.append(div);
            });
           
        })
    }

    static addRenderVista(idSeleccionado){
        let mapaConexiones = App.generarConexiones();
        let id = idSeleccionado.target.id
        let idMostrar= mapaConexiones.get(id);
        let vistaActual = App.idVistaActual;
       // console.log('VISTA ACTUAL', App.idVistaActual, idMostrar)
       // console.log(vistaActual, idMostrar)
        ManejadorVista.renderVista(vistaActual, idMostrar);
        ManejadorVista.mostrarContenedorPrincipal();
        App.idVistaAnterior = vistaActual;
        App.idVistaActual = idMostrar;
        if(App.idVistaActual === 'contenedor-menu-despensa-alimentos'){
          App.renderAlimentos();
        }
        if(App.idVistaActual === 'contenedor-menu-recetas'){
            let c = Array.from(document.getElementsByClassName('contenedor-busqueda-alimento'))
            c.forEach(e=>{
                e.remove();
            })
           let submit =  document.getElementById('buscador');
           submit.previousElementSibling.value = "";
        
           submit.addEventListener('click', App.buscarReceta);

           
        }

    }

    static conectarBotonesNavegacion() {
        this.arrayIdBotones.forEach(el => {
            let button = document.getElementById(el);
            button.addEventListener('click', this.addRenderVista.bind(el));
        });
    }
    static conectarVueltaAtras () {
        const atras = document.querySelectorAll('.volver');
        atras.forEach(e => {
            e.addEventListener('click', this.volverAtras);
        })
    }
    static renderModal(){
        let idModal = App.generarConexiones().get(this);
        //this se refiere al elemento que se le ha pasado a bind en la funcion de renderModal cuando es llamada en el addEventListener de conectarModales
        //en este caso es el ID del boton que ha sido pulsado, lo que lanzará en el modal una vez obtenida el id de dicho modal en el mapa de conexiones
        //console.dir(`ID modal: ${idModal}\nVista Actual: ${App.idVistaActual}`)
        new ModalGenerator(idModal, App.idVistaActual);


    }
    static conectarModales(){
        //aqui conectaremos todos los modales de la App
       const btnModal = ['btnRegistrarComida','btnModificarComida','btnEliminarComida'];
       btnModal.forEach(e => {
            let button = document.getElementById(e);
            button.addEventListener('click', this.renderModal.bind(e))
       });

    }
    
    static buscarAlimento(name){
    
        return App.arrayAlimentos.filter( el => {
           return  el.nombre.toLowerCase() === name;
            //console.log(el.nombre.toLowerCase() === nombre.toLowerCase());
        });
      
    }
    static init(){
        this.conectarBotonesNavegacion();
        this.conectarVueltaAtras();
        this.conectarModales();
    }

}

App.init();