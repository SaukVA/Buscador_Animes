
const URL_API = "https://api.jikan.moe/v4/anime?q=";
const lens = document.querySelector('#lens');
const input = document.querySelector('#input');
const content = document.querySelector('.content');
const cabecera = document.querySelector('.title');
const error = document.createElement("h2");
error.style.color = '#b75b5b';
var animes =  new Array();

const search = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let title = input.value;
    if(title != ''){
        fetch(URL_API + title)
            .then(response => response.json())
            .then(json => {
                content.innerHTML = "";
                if(json.data[0]){
                    animes = new Array();
                    json.data.forEach((dates, index) => {
                        let temp = new Anime(dates);
                        temp.posicion = index;
                        animes.push(temp);
                    });                    
                    
                    animes.forEach(anime => {
                        content.appendChild(anime.toImage());
                    });
                }
                else{
                    error.textContent = 'No existe el anime "' + title + '"';
                    content.appendChild(error);
                }
            });
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 120,
        behavior: 'smooth'
    })
}

const displayAnime = (index) =>{
    content.innerHTML = "";
    content.appendChild(animes[index].toElement());
    scrollToTop();
};

lens.addEventListener('click', search);

input.addEventListener('keyup',(event)=>{
    if(event.keyCode == 13){
        search();
    }
});