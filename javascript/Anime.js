class Anime {

    #posicion;

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
        let title = document.createElement("p");

        img.className ="anime__image hvr-float-shadow content__before"
        img.style.background = "url(" + this.image + ") center no-repeat";
        img.style.backgroundSize = "cover";
        img.setAttribute('onClick','displayAnime(' + this.#posicion +')');
        title.textContent = this.title;

        img.appendChild(title);
        return img;
    }

    get posicion(){ return this.#posicion; }
    set posicion(pos){ this.#posicion = pos;}
}