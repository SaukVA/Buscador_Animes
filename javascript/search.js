const URL_API = "https://api.jikan.moe/v4/anime?q=";
const lens = document.querySelector('#lens');
const input = document.querySelector('#input');
const content = document.querySelector('.content');
const error = document.createElement("h2");
error.style.color = '#b75b5b';
var animes =  new Array(); 

class Anime {
    /* Constructor de la clase anime */
    constructor(anime){
        this.title = anime.title;
        this.synopsis = anime.synopsis;
        this.image = anime.images.jpg.large_image_url;
    }

    /* Funcion que nos devulve como resultado toda la infromación de un anime */
    toElement() {
        let anime = document.createElement("div");
        let text = document.createElement("div");
        let img = document.createElement("div");
        let title = document.createElement("h2");
        let synopsis = document.createElement("p");

        anime.className = "anime";

        img.className ="anime__image"
        img.style.background = "url(" + this.image + ") center no-repeat";
        img.style.backgroundSize = "cover";

        text.className ="anime__text"
        
        title.textContent = this.title;
        synopsis.textContent = this.synopsis;

        anime.appendChild(img);
        text.appendChild(title);
        text.appendChild(synopsis);
        anime.appendChild(text);

        return anime;
    }
    
    /* Función que nos devuelve solamente la imagen del anime */
    toImage(){
        let img = document.createElement("div");
        img.className ="anime__image hvr-float-shadow"
        img.style.background = "url(" + this.image + ") center no-repeat";
        img.style.backgroundSize = "cover";

        return img;
    }
}

const search = () =>{
    let title = input.value;

    if(title != ''){
        fetch(URL_API + title)
            .then(response => response.json())
            .then(json => {
                if(json.data[0]){
                    animes = new Array();
                    json.data.forEach(dates => {
                        animes.push(new Anime(dates));
                    });                    
                    content.innerHTML = "";
                    animes.forEach(anime => {
                        content.appendChild(anime.toImage());
                    });
                }
                else{
                    content.innerHTML = "";
                    error.textContent = 'No existe el anime "' + title + '"';
                    content.appendChild(error);
                }
            });
    }
};

lens.addEventListener('click', search);

input.addEventListener('keyup',(event)=>{
    if(event.keyCode == 13){
        search();
    }
});