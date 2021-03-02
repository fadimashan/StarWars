const apiBtn = document.querySelector('#btn-search');
const apiOutput = document.querySelector('#api-output');
const actorName = document.querySelector('#input-name');
const urlApi = `https://www.swapi.tech/api/people?name=`;
let newUrl = "";

const getSearch = () => {
    let searchName = actorName.value;
    if (searchName !== "") {
        withSearch();
    } else {
        withoutSearch();
    }
}

apiBtn.addEventListener('click', getSearch);

function withSearch() {
    fetch(urlApi + actorName.value, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.result);
            let dataArr = data.result;
            apiOutput.value = '';

            // if (condition) {

            // }
            dataArr.forEach(person => {
                console.log(person);
                apiOutput.value +=
                    (`${person.properties.name}\n${person.description}\nHeight ${person.properties.height}         Mass ${person.properties.mass}\nHair color ${person.properties.hair_color}         Skin color ${person.properties.skin_color}
                    \n________________________________________________________\n\n`)
            })
        })
        .catch(error => {
            console.log('fel! ' + error);
        })
}

function withoutSearch() {
    apiOutput.value = '';
    for (let i = 1; i <= 10; i++) {
    let peoplePageList = `https://www.swapi.tech/api/people?page=${i}&limit=10`
    fetch(peoplePageList, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let dataArr = data.results;
            dataArr.forEach(person => {
                console.log(person);
                apiOutput.value +=
                    `${person.name}\n`
            })
        })
        .catch(error => {
            console.log('fel! ' + error);
        })
    }

}

var input = document.querySelector("#input-name");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        // document.getElementById("button-addon1").click();
        document.querySelector("#btn-search").click();
    }
});