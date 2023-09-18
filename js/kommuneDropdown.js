console.log("We're in kommuneDropdown.js bois!")

//Variables
const urlKommune = "https://api.dataforsyningen.dk/kommuner"
const ddKommuner = document.getElementById("ddKommuner")
const pbFetchKommuner = document.getElementById("pbFetchKommuner")
const searchKommuneInp = document.getElementById("searchKommune")
const aTags = document.getElementById("a-tags")
const kommuneDataMap = new Map

//Fetch kommuner from API
function fetchKommuner(any) {
    console.log("Inside fetchKommuner: " + any)
    return fetch(any).then(response => response.json())
}

//Fetches and fills dropdown when activated
async function actionFetch() {
    const kommuner = await fetchKommuner(urlKommune)
    fillDropdown(kommuner)
}

//Fills dropdown with fecthed kommuner
function fillDropdown(kommuner) {
    ddKommuner.innerHTML = ""; //clears dropdown from previous
    kommuner.forEach(kommune => {
        const option = document.createElement("option")
        option.textContent = kommune.navn
        option.value = kommune.navn
        ddKommuner.appendChild(option)

        //Store kommuner in map, with name as key
        kommuneDataMap.set(kommune.navn, {
            name: kommune.navn,
            code: kommune.kode,
            href: `${urlKommune}/${kommune.kode}`
        })
    })
}

//Creates an <a> tag for a Kommune
function createATag(kommune) {
    if (!kommune.used) {
        const aTag = document.createElement("a")
        aTag.textContent = kommune.name
        aTag.href = kommune.href
        aTags.appendChild(aTag)
    }
}

//Detect input changes, only shows and creates aTag if the input matches a kommune
searchKommuneInp.addEventListener("input", function () {
    const inputText = this.value.trim(); //wont detect spaces
    aTags.innerHTML = ""
    if (inputText && kommuneDataMap.has(inputText)) {
        createATag(kommuneDataMap.get(inputText))
    }
})

pbFetchKommuner.addEventListener('click', actionFetch)