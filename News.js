let category = "business";
let country = "us";
let loader = 'https://icons8.com/preloaders/preloaders/35/Fading%20lines.gif';
let page = 1;
let loading = true;
let cardsPerPage = 8;

async function Search() {
    let search = document.getElementById("Search");
    let select = document.getElementById("country");
    selectvalue = select.value;
    country = selectvalue;
    console.log(selectvalue)
    let searchvalue = search.value;
    category = searchvalue;
    console.log(category);

    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=195900f89c014501b26bd54b0ee9e106&page=${page}&pageSize=${cardsPerPage}`);
    let data = await response.json();
    console.log(data);
    await renderdata(data)
}
Search()

async function fetchdata() {

    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=195900f89c014501b26bd54b0ee9e106&page=${page}&pageSize=${cardsPerPage}`);
    let data = await response.json();
    console.log(data);
    await renderdata(data);
}
fetchdata()

async function next() {
    page++;
    let nextbtn = document.getElementById("nextbtn");
    let prevbtn = document.getElementById('prevbtn');
    prevbtn.style.backgroundColor = 'rgba(0, 0, 0, 0.932)'
    prevbtn.disabled = false;
    nextbtn.disabled = false;

    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=195900f89c014501b26bd54b0ee9e106&page=${page}&pageSize=${cardsPerPage}`);
    let data = await response.json();
    let totalPage = Math.ceil(data.totalResults / cardsPerPage)
    console.log(data);
    await renderdata(data)

    if (page >= totalPage) {
        nextbtn.disabled = true;
        nextbtn.style.backgroundColor = 'rgba(0, 0, 0, 0.681)'
    }
}

async function prev() {
    page--;
    if (page <= 1) {
        let prevbtn = document.getElementById('prevbtn');
        prevbtn.disabled = true;
        prevbtn.style.backgroundColor = 'rgba(0, 0, 0, 0.681)'
    }
    else {
        let nextbtn = document.getElementById("nextbtn");
        nextbtn.disabled = false;
        nextbtn.style.backgroundColor = 'rgba(0, 0, 0, 0.932)'

        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=195900f89c014501b26bd54b0ee9e106&page=${page}&pageSize=${cardsPerPage}`);
        let data = await response.json();
        console.log(data);
        await renderdata(data)
    }
}

async function renderdata(data) {

    let cardsection = document.querySelector(".cardsec");
    cardsection.classList.add('cardsec');
    cardsection.innerHTML = '';

    (data.articles).forEach(news => {

        let card = document.createElement('div');
        card.classList.add('card');

        let img = document.createElement('img');
        img.src = news.urlToImage;
        img.classList.add('cardimg')
        if (news.urlToImage === null || news.urlToImage === "[Removed]") {
            img.src = 'https://th.bing.com/th?id=OIP.kofaNfoIgjtGB_iw1AEofgHaDt&w=349&h=174&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
        }

        let title = document.createElement('h5');
        title.textContent = news.title;
        title.classList.add('title');
        if (news.title === null || news.title === "[Removed]") {
            title.textContent = "Sorry No Title for this news article.";
            title.style.color = "red";
            title.style.fontWeight = "bold";
        }

        let desc = document.createElement('p');
        desc.textContent = news.description;
        desc.classList.add('desc');
        if (news.description === null || news.description === "[Removed]") {
            desc.textContent = "Sorry No Description for this news article, but you can check out by clicking below";
            desc.style.color = "red";
            desc.style.fontWeight = "bold";
        }

        let button = document.createElement('button');
        button.classList.add('cardbtn');
        button.textContent = "See more";
        button.addEventListener('click', () => {
            window.open(news.url);
        });
        card.append(img);
        card.append(title);
        card.append(desc);
        card.append(button);
        cardsection.append(card);
    });
    console.log(data.totalResults);
};