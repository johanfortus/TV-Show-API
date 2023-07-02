async function getShow(search){
    let res = await axios.get(`https://api.tvmaze.com/search/shows?q=<${search}>`)
    renderShows(res.data)
}
function renderShows(shows){
    const showSpace = document.querySelector('.showSpace')
    for(let show of shows){
        const showID = show.show.id
        const newIMG = document.createElement('img');
        console.log(show.show)
        newIMG.src = show.show.image.medium

        const imgContainer = document.createElement('div')
        const showName = document.createElement('div')
        const showDesc = document.createElement('div')
        const showEpisodes = document.createElement('button')
        
        imgContainer.setAttribute('class', 'col-12 col-md-6 mb-5')

        newIMG.setAttribute('class', 'img-fluid')

        showName.innerText = show.show.name
        showName.setAttribute('class', 'display-2 fs-3 text-primary')

        showEpisodes.setAttribute('class', 'showEpisodesBtn')
        showEpisodes.innerText = 'Episode List'
        

        showDesc.innerHTML = show.show.summary

        showSpace.append(imgContainer)
        imgContainer.append(newIMG)
        imgContainer.append(showName)
        imgContainer.append(showDesc)
        imgContainer.append(showEpisodes)

        showEpisodes.addEventListener('click', async function(){
            $('.episodeSpace').empty()
            let res = await axios.get(`https://api.tvmaze.com/shows/${showID}/episodes`)
            let episodeSpace = document.createElement('div')
            episodeSpace.setAttribute('class', 'episodeSpace')

            let h2 = document.createElement('h2')
            let ul = document.createElement('ul');
            let removeBtn = document.createElement('button')

            h2.innerText = 'Episodes'
            removeBtn.innerText = 'Clear List'
            removeBtn.setAttribute('class', 'removeBtn')

            
            imgContainer.append(episodeSpace)
            episodeSpace.append(removeBtn)
            episodeSpace.append(h2)
            episodeSpace.append(ul)
            

            for(let episodes of res.data){
                console.log(episodes)
                let li = document.createElement('li');
                li.innerText = `${episodes.name} (season ${episodes.season}, episode ${episodes.number})`
                ul.append(li)
            }

            removeBtn.addEventListener('click', function(){
                $('.episodeSpace').empty()
            })

        })
    } 
}

let button = document.querySelector('.searchShow')
button.addEventListener('click', function(e){
    const showSpace = document.querySelector('.showSpace')
    $(showSpace).empty()
    let input = document.querySelector('input')
    let search = input.value
    getShow(search)
})




