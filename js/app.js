const elList = selector('.list')
const elInput = selector('.input')
const toLeft = selector('.to-left')
const toRight = selector('.to-right')
const elModal = selector('.modal')
const totalResult = selector('.totalPageNumber')
const elSelect = selector('.select')

//TEMPLATE
const elTemplate = selector('.todo-template').content

let inputValue = ''
let pageNumber = 1
let elSelectValue = ''
let startPage = 1
let finishPage = 10

//API KEY
const API_KEY = 'f2478537'

//ASYNC FUNCTION
async function fetchMovies() {
    elList.innerHTML = "<img class='spinnerSvg' src='./images/spinner.svg' />"
    const response = await fetch('https://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + inputValue + '&type=' + elSelectValue + '&page=' + pageNumber)
    const data = await response.json()
    const movies = data.Search
    const pageCount = data.totalResults
    totalResult.textContent = pageCount

    if(pageCount > 10) {
        btnWrapper.classList.remove('dis-non')
    }  else {
        btnWrapper.classList.add('dis-non')
    }

    if(pageNumber <= 1) {
        toLeft.disabled = true
        
    } else {
        toLeft.disabled = false
    }

    if(pageNumber >= pageCount / 10) {
        toRight.disabled = true
    } else { 
        toRight.disabled = false
    }
    
    renderTodos(movies, elList)
}
//running function
fetchMovies()

//MAIN FUNCTION
function renderTodos(arr, element) {
    element.innerHTML = null
    
    const fragment = document.createDocumentFragment()

    arr.forEach(movie => {
        const readyTemplate = elTemplate.cloneNode(true)

        selector('.todo-img', readyTemplate).src = movie.Poster
        selector('.todo-img', readyTemplate).onerror = evt => {evt.target.src = 'https://via.placeholder.com/100X150'}
        selector('.todo-title', readyTemplate).textContent = movie.Title
        selector('.todo-type', readyTemplate).textContent = movie.Type
        selector('.todo-year', readyTemplate).textContent = movie.Year + ' years'
        selector('.imdb-id', readyTemplate).textContent = 'imdb ID: ' + movie.imdbID

        fragment.appendChild(readyTemplate)
    })
    element.appendChild(fragment)
}


//ADD EVENT LISTENERS

elInput.addEventListener('change', evt => {
    inputValue = evt.target.value

    //running function
    fetchMovies()
})


toLeft.addEventListener('click', evt => {
    pageNumber--

    startPage -= 10
    finishPage -= 10

    pageBlock.textContent = '(' + startPage + '/' + finishPage + ')'
    
    //running function
    fetchMovies()
})

toRight.addEventListener('click', evt => {
    pageNumber++

    startPage += 10
    finishPage += 10

    pageBlock.textContent = '(' + startPage + '/' + finishPage + ')'

    //running function
    fetchMovies()
})


elSelect.addEventListener('change' ,evt  => {
    elSelectValue = evt.target.value

    fetchMovies()
})