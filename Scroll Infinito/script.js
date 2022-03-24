const imageContainer = document.getElementById('imgContainer');
const loader = document.getElementById('loader');

let imagenesReady = false;
let imagenesCargadas = 0;
let totalImagenes = 0;
let fotosArray = [];


//unsplash API
const count = 10;
const apiKey = 'Ag7EDVCkU7KBPWnosI0_DUyb3Ou6N-jT6dp8NX3VoDI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//funcion auxiliar para setear atributos
function setearAtributos(elemento, atributos){
    for(const key in atributos){
        elemento.setAttribute(key, atributos[key])    
    }
    //con este mini funcion me ahorro de
    // item.setAttribute('href', imagen.links.html )
    // item.setAttribute('target', '_blank');
    // img.setAttribute('src',imagen.urls.regular);
    // img.setAttribute('alt', imagen.alt_description);
    // img.setAttribute('title', imagen.alt_description);
}

//chequear imagenes cargadas
function imagenCargada(){
    imagenesCargadas++;
    if(imagenesCargadas === totalImagenes){
        imagenesReady = true;
        loader.hidden = true;
    }

}

//crear elementos para links y fotos, agregar al DOM
function mostrarImagenes(){
    imagenesCargadas = 0;
    totalImagenes = fotosArray.length;
    fotosArray.forEach((imagen) => {
        //creamos un <a> para linkear a unsplash
        const item = document.createElement('a');
        
        //creamos el <img> para la imagen
        setearAtributos(item,{
            href: imagen.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
      
        //poner <img> adentro del <a> y ambos adentro del container
        setearAtributos(img,{
            src: imagen.urls.regular,
            alt: imagen.alt_description,
            title: imagen.alt_description,
        });
        //event listener para chequear cuando estan cargadas
        img.addEventListener('load', imagenCargada)

        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}





//obtener fotos de la api
async function getImagenes(){
    try{
        const respuesta = await fetch(apiUrl);
        fotosArray = await respuesta.json();
        mostrarImagenes();

    }catch(error){
        window.alert(error);
    }
}

//ver si el scroll esta cerca del final y cargar mas fotos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && imagenesReady){
        imagenesReady = false;
        getImagenes()
    }
});


getImagenes();