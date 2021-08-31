# javascriptDespensApp

             
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


