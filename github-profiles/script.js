const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");


async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(user);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user) {
    //création de la carte
    const cardHTML = `
        <div class="card">
            <div class="user-image">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <h3>${user.company}</h3>
                <p>${user.bio}</p>

                <ul class="infos">
                    <li><i class="fa-solid fa-eye"></i>&nbsp;
                        <p class="view"> ${user.following}</p>
                    </li>
                    <li><i class="fa-solid fa-heart"></i>&nbsp;
                        <p class="likes"> ${user.followers}</p>
                    </li>
                    <li><i class="fa-solid fa-message"></i>&nbsp;
                        <p class="comments">${user.public_repos}</p>
                    </li>
                </ul>

                <div id="repos">
                <p><strong>Repos : </strong></p>
                </div>
            </div>
        </div>
    `;

    //transformation du code de cardHTML en HTML
    main.innerHTML = cardHTML;

}



function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    //on récupère la valeur stocker dans l'input qui sera l'id github d'une personne
    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});