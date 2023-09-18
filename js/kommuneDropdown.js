console.log("We're in kommuneDropdown.js bois!")

const urlKommune = "https://api.dataforsyningen.dk/kommuner"

//Fetch kommuner from API
function fetchKommuner(any) {
    console.log("Inside fetchKommuner: " + any)
    return fetch(any).then(response => response.json())
}

//Fills dropdown with fecthed kommuner
function fillDropdown(kommuner) {
    ddKommuner.innerHTML = ""; //clears dropdown from previous
    kommuner.forEach(kommune => {
        const option = document.createElement("option")
        option.textContent = kommune.navn
        option.value = kommune.kode
        ddKommuner.appendChild(option)
    })
}

//Fetches and fills dropdown when activated
async function actionFetch() {
    const kommuner = await fetchKommuner(urlKommune)
    console.log(kommuner)
    fillDropdown(kommuner)
}

const ddKommuner = document.getElementById("ddKommuner")
const pbFetchKommuner = document.getElementById("pbFetchKommuner")
pbFetchKommuner.addEventListener('click', actionFetch)
