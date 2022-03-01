const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url);

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    data.forEach(data => {
        console.log(data);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${data.image}" class="card-img-top h-75" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.brand}</h5>
                <h6>${data.phone_name}</h6>
                <p>${data.slug}</p>
                <button)" type="button" class="btn btn-success">Explore</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

