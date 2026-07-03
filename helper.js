const imgBlock = document.querySelector(".img");
const URL_BACK = "https://api.github.com/users/";
const savedUsers = document.querySelector(".savedUsers");

function closeLoarding() {
  imgBlock.style.display = "none";
}

function openLoarding() {
  imgBlock.style.display = "block";
}

const getUserHelper = async (login) => {
  openLoarding();
  const response = await fetch(URL_BACK + login);
  const data = await response.json();
  if (!response.ok) {
    alert(data.message);
    closeLoarding();
    return null;
  }

  closeLoarding();

  return data;
};

function changeBackgrColor(themeCol, lightCol) {
  const themeColor = lightCol.classList == "light" ? "dark" : "light";
  themeCol.textContent = lightCol.classList;
  lightCol.classList.remove(lightCol.classList);
  lightCol.classList.add(themeColor);

  localStorage.setItem("theme", themeColor);
}

function getThemeColorFromLocalSTorage(themeCol, lightCol) {
  const themeColor = localStorage.getItem("theme");
  if (themeColor == undefined) return;
  lightCol.classList.remove(lightCol.classList);
  lightCol.classList.add(themeColor);
  themeCol.textContent = themeColor == "light" ? "dark" : "light";
}





const createHeader = (block,users) => {
  const header = `<div class="header_block">
      <a href="./index.html" class="homeBtn">Home</a>
      <a href="./compare.html" class="searchBtn">Compare</a>
    </div>`
    // block.innerHTML = header + users.innerHTML;
    const headerBlock = document.createElement("header");
    headerBlock.innerHTML = header;
    block.prepend(headerBlock);
}


const getUsersFromLocalStorageforComparePage = () => {
    const plusElemUsers = JSON.parse(localStorage.getItem("plusElemUsers"))
    for(let i = 0; i < plusElemUsers.length; i++){
       showUsersAtComparePage(plusElemUsers[i])
    }
    console.log(plusElemUsers)
}

const showUsersAtComparePage = (data) => {
   savedUsers.innerHTML =
    `<div class="user" id="${data.id}">
    <img src="${data.avatar_url}">
    <a href="./index2.html?login=${data.login}"><button>></button></a>
    <img class="img_delete" slot="delete" title="${data.id}" src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-rszw-p-ikonka-krestik-png-25.png">
    <h1>Name: ${data.name}</h1>
    <p>Login: ${data.login}</p>
    <p>Followers: ${data.followers}</p>
    <p>Following: ${data.following}</p>
    <p>Location: ${data.location}</p>
    <p>Public gists: ${data.public_gists}</p>
    </div>` + savedUsers.innerHTML;
}





createHeader(document.body); 
getUsersFromLocalStorageforComparePage();