const API__KEY = '0b7a327f3101b4889cd54efa4797cbec'
const API__URL = 'https://api.themoviedb.org/3'
const popularZone = document.querySelector('.popular__zone')

const bestZone = document.querySelector('.best__zone')
const searchZone = document.querySelector('.search__zone')

const searchInput = document.getElementById('search')


let category = ''



// POPULAR MOVIES


async function loadPopular () {
    const API__POPULAR__URL = `${API__URL}/movie/popular?api_key=${API__KEY}&language=en-US&page=1`
    const resp = await fetch
    (API__POPULAR__URL, {
        method: 'GET',
    })

    const respResults = await resp.json()

    if(resp.ok){
        getPopularMovie(respResults)
    }
}

function getPopularMovie(data){
    const popularMovies = data.results
    popularMovies.forEach(element => {
        const moviesTitle = element.title
        const movieRate = element.vote_average
        const moviePoster = 'https://image.tmdb.org/t/p/w500' + element.poster_path
        const movieId = element.id

        const template = `
            <div class="popular__card movieCard" onclick="showModal(${movieId})">

                <img src="${moviePoster}" alt="" class="movieCard__img">

                <div class="movieCard__info">

                    <span class="movieCard__rate movieCard__rate_${getClassByRate(movieRate)}">${movieRate}</span>

                    <div class="movieCard__footer">

                        <h3 class="movieCard__title">${moviesTitle}</h3>

                    </div>

                </div>

            </div>
        `

        popularZone.innerHTML += template

    });
}

loadPopular()





// RATE COLORS


function getClassByRate(vote){
   if (vote >= 7) {
     return "green";
   } else if (vote > 5) {
     return "yellow";
   } else
     return "red";
}                        





// BEST SIERIES


async function loadBest () {
    const API__BEST__URL = `${API__URL}/movie/top_rated?api_key=${API__KEY}&language=en-US&page=1`
    const resp = await fetch
    (API__BEST__URL, {
        method: 'GET',
    })

    const respResults2 = await resp.json()

    if(resp.ok){
        getBestMovie(respResults2)
    }
}


function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;
        
    if (img.complete) {
        callback(true);
    } else {
        img.onload = () => {
        callback(true);
    };
              
    img.onerror = () => {
        callback(false);
        };
    }
}


function getBestMovie(data){
    const bestMovies = data.results
    bestMovies.forEach(element => {
        const moviesTitle = element.title
        const movieRate = element.vote_average
        const moviePoster = 'https://image.tmdb.org/t/p/w500' + element.poster_path
        const movieId = element.id


        checkIfImageExists(moviePoster, (exists) => {
        if (exists) {
            const template = `
                <div class="best__card movieCard" onclick="showModal(${movieId})">

                    <img src="${moviePoster}" alt="" class="movieCard__img">

                    <div class="movieCard__info">

                        <span class="movieCard__rate movieCard__rate_${getClassByRate(movieRate)}">${movieRate}</span>

                        <div class="movieCard__footer">

                            <h3 class="movieCard__title">${moviesTitle}</h3>

                        </div>

                    </div>

                </div>
            `

            bestZone.innerHTML += template
      }
        });
});
}

loadBest()






// SEARCHING


async function loadSearchMovie (searchQuery) {
    const API__BEST__URL = `${API__URL}/search/movie?api_key=${API__KEY}&query=${searchQuery}&page=1`
    const resp = await fetch
    (API__BEST__URL, {
        method: 'GET',
    })


    const respResults2 = await resp.json()

    if(resp.ok){
        getSearchMovie(respResults2)
    }
}


function getSearchMovie(data){
    const search = data.results
    console.log(search);

    search.forEach(element => {
        const moviesTitle = element.title
        const movieRate = element.vote_average
        const moviePoster = 'https://image.tmdb.org/t/p/w500' + element.poster_path
        const movieId = element.id


        checkIfImageExists(moviePoster, (exists) => {
            if (exists) {
                    const template = `
                    <div class="popular__card movieCard" onclick="showModal(${movieId})">

                        <img src="${moviePoster}" alt="" class="movieCard__img">

                        <div class="movieCard__info">

                            <span class="movieCard__rate movieCard__rate_${getClassByRate(movieRate)}">${movieRate}</span>

                            <div class="movieCard__footer">

                                <h3 class="movieCard__title">${moviesTitle}</h3>

                            </div>

                        </div>

                    </div>
                `

                popularZone.innerHTML = ''
                searchZone.innerHTML += template
            }
            });
    });
}


searchInput.addEventListener('input', ()=>{

    searchZone.innerHTML = ''
    
    if(searchInput.value){
        console.log(searchInput.value);
        loadSearchMovie(searchInput.value)
    }else{
        loadPopular()
        loadBest()
    }
})



// MODAL


let originalTitle = ''
let overviewTitle = ''
let title = ''
let moviePoster = ''
let genres = ''





const createModal = data =>{
    const modal = document.querySelector('.modal')

    console.log(data);


    // NEEDED INFO ABOUT MOVIE



    let originalTitle = data.original_title
    let overviewTitle = data.overview
    let title = data.title
    let moviePoster = data.poster_path
    let genres = data.genres






    modal.innerHTML=`
                    <img src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="" class="movie__poster">

                    <div class="modal__info">

                        <div class="movie__titles">

                            <h2 class="movie__title">${title}</h2>

                            <span class="orig__title">${originalTitle}</span>

                        </div>

                        <div class="movie__genres">

                            

                            ${genres.map((genre) => `<span class="movie__genre">${genre.name}</span>`)}

                        </div>

                        <p class="movie__overview">${overviewTitle}</p>

                        <button class="btn__modal" onclick="closeModal()">Close</button>

                    </div>
            `
}




const showModal = index =>{
    const modal = document.querySelector('.modal')
    modal.style.display = 'flex'
    loadDetails(index)
}


const closeModal = () =>{
    let originalTitle = ''
    let overviewTitle = ''
    let title = ''
    let moviePoster = ''
    let genres = ''
    const modal = document.querySelector('.modal')
    modal.style.display = 'none'
}


async function loadDetails(movieId) {
    const API__DETAILS__URL = `${API__URL}/movie/${movieId}?api_key=${API__KEY}&language=en-US`
    const resp = await fetch
    (API__DETAILS__URL, {
        method: 'GET',
    })

    const respResults = await resp.json()

    if(resp.ok){
        createModal(respResults)
    }
}