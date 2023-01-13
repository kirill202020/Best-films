const API__KEY = '0b7a327f3101b4889cd54efa4797cbec'
const API__URL = 'https://api.themoviedb.org/3'
const popularZone = document.querySelector('.popular__zone')

const bestZone = document.querySelector('.best__zone')
const searchZone = document.querySelector('.search__zone')

const searchInput = document.getElementById('search')


let category = ''

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
        const moviePoster = element.poster_path

        const template = `
            <div class="popular__card movieCard">

                <img src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="" class="movieCard__img">

                <div class="movieCard__info">

                    <span class="movieCard__rate">${movieRate}</span>

                    <div class="movieCard__footer">

                        <h3 class="movieCard__title">${moviesTitle}</h3>

                        <p class="movieCard__genre">Sci-Fi</p>

                    </div>

                </div>

            </div>
        `

        popularZone.innerHTML += template

    });
}

loadPopular()








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

function getBestMovie(data){
    const bestMovies = data.results
    bestMovies.forEach(element => {
        const moviesTitle = element.title
        const movieRate = element.vote_average
        const moviePoster = element.poster_path

        const template = `
            <div class="best__card movieCard">

                <img src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="" class="movieCard__img">

                <div class="movieCard__info">

                    <span class="movieCard__rate">${movieRate}</span>

                    <div class="movieCard__footer">

                        <h3 class="movieCard__title">${moviesTitle}</h3>

                        <p class="movieCard__genre">Sci-Fi</p>

                    </div>

                </div>

            </div>
        `

        bestZone.innerHTML += template

    });
}

loadBest()






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
        const moviePoster = element.poster_path

        const template = `
            <div class="popular__card movieCard">

                <img src="https://image.tmdb.org/t/p/w500${moviePoster}" alt="" class="movieCard__img">

                <div class="movieCard__info">

                    <span class="movieCard__rate">${movieRate}</span>

                    <div class="movieCard__footer">

                        <h3 class="movieCard__title">${moviesTitle}</h3>

                        <p class="movieCard__genre">Sci-Fi</p>

                    </div>

                </div>

            </div>
        `

        popularZone.innerHTML = ''
        searchZone.innerHTML += template

    });


}


searchInput.addEventListener('input', ()=>{
    searchZone.innerHTML = ''
    
    if(searchInput.value){
        loadSearchMovie(searchInput.value)
    }else{
        loadPopular()
        loadBest()
    }
})





