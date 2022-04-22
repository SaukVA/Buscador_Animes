const URL_API = "https://api.jikan.moe/v4/anime?q=";
const lens = document.querySelector('#lens');
const input = document.querySelector('#input');
const content = document.querySelector('.content');

class Anime {
    constructor(anime){
        this.title = anime.title;
        this.synopsis = anime.synopsis;
        this.image = anime.images.jpg.large_image_url;
    }

    toElement() {
        let anime = document.createElement("div");
        let text = document.createElement("div");
        let img = document.createElement("img");
        let title = document.createElement("h2");
        let synopsis = document.createElement("p");

        anime.className = "anime";

        img.className ="anime__image"
        img.src = this.image;

        text.className ="anime__text"
        
        title.textContent = this.title;
        synopsis.textContent = this.synopsis;

        anime.appendChild(img);
        text.appendChild(title);
        text.appendChild(synopsis);
        anime.appendChild(text);

        return anime;
    }
}

const search = () =>{
    let title = input.value;

    if(title != ''){
        fetch(URL_API + title)
            .then(response => response.json())
            .then(json => {
                if(json.data[0]){    
                    let anime = new Anime(json.data[0]);
                    content.innerHTML = "";
                    content.appendChild(anime.toElement());
                }
                else{
                    let error = document.createElement("h2");
                    error.style.color = '#b75b5b';
                    error.textContent = 'No existe el anime "' + title + '"';
                    content.innerHTML = "";
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