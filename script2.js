const params = new URLSearchParams(window.location.search);
const login = params.get("login");
const users_repos = document.querySelector(".users_repos");
const userTeg = document.querySelector(".user_cont");
// const imgBlock = document.querySelector(".img");
const themeBackground = document.querySelector(".theme");
const lightColor = document.querySelector(".light");

console.log(login);

const getUserData = async () => {
    const dataUser = await getUserHelper(login);
    
    openLoarding()
    const responseRepositories = await fetch(dataUser.repos_url);
    const dataRepositories = await responseRepositories.json();

    createUserForPage(dataUser)
    createRepositoriesForPage(dataRepositories)
    closeLoarding()
}
//!


const createUserForPage = (user) => {
    userTeg.innerHTML = ` <h1>${user.name}</h1>
      <img class="img__user" src="${user.avatar_url}">`
}
const createRepositoriesForPage = (repositories) => {
    let result = "";
    for(let i = 0; i < repositories.length; i++){
        const repos = repositories[i]
    result += `<p>${repos.name}</p>
    <p>${repos.description}</p>
    <p>${repos.size}</p>
    <a href="${repos.svn_url}"><button>To repository</button></a>`
    }
    users_repos.innerHTML = result;  
    console.log(repositories)
}

function changeBackgrondColorForRepository() {
  changeBackgrColor(themeBackground, lightColor)
}

function getThemeColorFromLocalSTforRepository(){
  getThemeColorFromLocalSTorage(themeBackground, lightColor)
}

getUserData()
themeBackground.addEventListener("click", changeBackgrondColorForRepository);
getThemeColorFromLocalSTforRepository();
// const showUserArr = async () => {
//     let result = "";
//     const repos = await getUserData();
//     if(repos.lenght !== 0){
//         for(let i = 0; i < repos.lenght; i++){
//            result += repos[i];
//         }
//     }
//     users_repos.innerHTML = result;
//     console.log(repos)
// }


// showUserArr()



// Когда открывается странтца сделать запрлос на бек что тбы получить информацию об пользователе 

  
// Так же когда ты получишь рользователя в нем есть ключ  repos_url 
// Нужно взять этот ключ и по нему сделать еще один запрос ответ от него это массив всех репозиториев текущего пользователя. этот массив так же нужно отрисовать 