var movieCardElement = document.querySelector("#top-movies");
const filmsUrl = "https://api.themoviedb.org/3/movie/popular?api_key=2749c112c710a720dd6ffd5794ef2d48&language=en-US&page=1";


function fetchData(url, addFunction,movieID) {
    console.log(url);
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(request.response);
            const response = request.response;
            addFunction(response,movieID);
        }
    };
    request.send();
}

fetchData(filmsUrl,addFilm);

function addFilm(response) {
    let count = 1;
    const results = response.results;
    for (let i = 0; i < results.length; i++) {
        const movie = results[i];
        let id = movie.id;
        movieCardElement.innerHTML += `
            <li class="movie-card">
            <div class="position">${count}</div>
            <div class="mc-poster">
                <a href="">
                    <img width="100" height=""
                         src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                         alt=${movie.title}>
                </a>
            </div>
            <div class="movie-data">
                <div class="mc-info-container">
                    <div class="mc-title">
                        <a href="https://www.filmaffinity.com/es/film809297.html" title="El padrino">
                            ${movie.title}
                        </a>
                        ${(movie.release_date).slice(0,4)}
                        <img src="https://www.filmaffinity.com/imgs/countries/US.jpg" alt="Estados Unidos">
                    </div>
                    <div class="mc-director">
                        <a href="" title="Francis Ford Coppola"></a>
                    </div>
                    <div id="mc-cast${id}">
                    </div>
                </div>
                <div class="data">
                    <div class="avg-rating">${movie.vote_average}</div>
                    <div class="rat-count">${movie.vote_count}<i class="fas fa-user"></i></div>
                </div>
            </div>
        </li>
    `
        let credits = "https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=2749c112c710a720dd6ffd5794ef2d48";

        fetchData(credits, addCasting,id);
    }
}
function addCasting(response2,id) {
    //let director = document.querySelector(".mc-director");
    let casting = document.querySelector("#mc-cast"+id);
    console.log("PIPO");
    //director.innerText = response.crew.job
    const cast = response2.cast;
    for (let i = 0; i < 5 ; i++) {
       casting.innerHTML += `<li>${cast[i].name}</li>`
    }
}