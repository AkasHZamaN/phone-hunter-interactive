const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data.slice(0, 20)))
}

const displaySearchResult = data => {
    const notFound = document.getElementById('not-found');
    notFound.innerHTML = '';
    const searchResult = document.getElementById('search-result'); 
        // Error handling for unavailable data    
        if(!data.data){
            const notFound = document.getElementById('not-found');
            const p = document.createElement('p');
            p.style.textAlign = 'center';
            p.style.fontSize = '20px';
            p.style.fontFamily = 'Hubballi, cursive';
            p.style.padding = '5px 0';
            p.innerText = 'Not Matched!';
            notFound.appendChild(p);   
        }

        searchResult.innerHTML = '';
        data.forEach(data => {
            
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 border-0 rounded-3">
            <img src="${data.image}" class="card-img-top w-75 mx-auto p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold">${data.brand}</h5>
                <h2>${data.phone_name}</h2>
                <p class="card-title">${data.slug}</p>
                <button onclick="mobileDetails('${data.slug}')" type="button" class="btn btn-success fw-bold px-3">Explore</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        notFound.innerHTML = '';
    })    
}
 // mobile details information
const mobileDetails = mobileId => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayMobileDetails(data.data));
}
    // create card and display more information
const displayMobileDetails = mobile => {
    // console.log(mobile);
        const mobileDetail = document.getElementById('mobile-detail');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <img src="${mobile.image}" class="card-img-top w-75 p-3 mx-auto" alt="...">
            <div class="card-body custom-body">
                <h5 class="card-title fw-bold">${mobile.brand}</h5>
                <p class="card-title fs-4">${mobile.slug}</p>

                <h6 class="card-title fw-bold fs-3">${mobile.name}</h6>
                <p></p>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">Released:</span> ${mobile.releaseDate ? mobile.releaseDate : 'Not Found!'}</h6>

                <hr class="w-75 mx-auto border border-1 border-success opacity-75 rounded">

                <h6 class="card-title fw-bold fs-5">Main Features:</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">chipSet:</span> ${mobile.mainFeatures.chipSet}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">display:</span> ${mobile.mainFeatures.displaySize}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">memory:</span> ${mobile.mainFeatures.memory}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">storage:</span> ${mobile.mainFeatures.storage}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">sensors:</span> ${mobile.mainFeatures.sensors}</h6>

                <hr class="w-75 mx-auto border border-1 border-success opacity-75 rounded">

                <h6 class="card-title fw-bold fs-5">Others:</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">Bluetooth:</span> ${mobile.others?.Bluetooth ? mobile.others?.Bluetooth : 'Not Found!'}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">GPS:</span> ${mobile.others?.GPS ? mobile.others?.GPS : 'Not Found!'}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">NFC:</span> ${mobile.others?.NFC ? mobile.others?.NFC : 'Not Found!'}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">Radio:</span> ${mobile.others?.Radio ? mobile.others?.Radio: 'Not Found!'}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">USB:</span> ${mobile.others?.USB ? mobile.others?.USB : 'Not Found!'}</h6>
                <h6 class="card-title fs-5"><span class="fw-bold fs-5">WLAN:</span> ${mobile.others?.WLAN ? mobile.others?.WLAN : 'Not Found!'}</h6>

            </div>
        `;
        // clear previous result after new explore
    mobileDetail.innerHTML = '';
    mobileDetail.appendChild(div);
}