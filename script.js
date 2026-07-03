const userName = document.getElementById("userName");
const searchBtn = document.querySelector(".search");
const users = document.querySelector(".users");
// const imgBlock = document.querySelector(".img");
const theme = document.querySelector(".theme");
const light = document.querySelector(".light");

const usersArr = [];

const getUserFromGitHub = async () => {
  const userNameV = userName.value;
  const filterArr = getExistUser(userName.value,usersArr);
  if (filterArr) {
    alert("This user already exists");
    return;
  }

  const data = await getUserHelper(userNameV);

  showNewUser(data);

  usersArr.push(data);
  sentUsersToOcalStorage();
  console.log(usersArr);
};

const showNewUser = (data) => {
  users.innerHTML =
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
    <button slot="plus" id="${data.login}"> + </button>
    </div>` + users.innerHTML;
  // <p>Id: ${data.id}</p>
  // <p>Mode_id: ${data.node_id}</p>
  // <p>Updated at: ${data.updated_at}</p>
  // <p>User view type: ${data.user_view_type}</p>
  // <p>Public Repos: ${data.public_repos}</p>
};

const newUsersArr = [];
const addPlusBtnUsers = (e) => {
  const t = e.target;
  const tPlus = t.slot;
  const login = t.id;
  if (tPlus !== "plus") return;
  changePlusMinusBtn(login);
  let filterArr = getExistUser(login,newUsersArr);
  console.log(filterArr)
  if (filterArr) return
  const plusElem = usersArr.filter((elem) => elem.login == login);
  newUsersArr.push(...plusElem);
  console.log(newUsersArr);
  sentUsersToLSToCompareOage(newUsersArr);
};

// const deleteUserFromComparePage = () => {
//   const t = e.target;
//   const tPlus = t.slot;
//   const login = t.id;
//   if (tPlus !== "plus") return;
//   const plus_btn = document.getElementById(login);
//   if (plus_btn.textContent == "-") {
//     const minusIndex = newUsersArr.findIndex((elem) => elem.login == login);
//     newUsersArr.splice(minusIndex, 1);
//   }
// };

const changePlusMinusBtn = (id) => {
  const plus_btn = document.getElementById(id);
  plus_btn.textContent = plus_btn.textContent.trim() == "+" ? "-" : "+";
};

const sentUsersToLSToCompareOage = (newUsersArr) => {
  localStorage.setItem("plusElemUsers", JSON.stringify(newUsersArr));
};

const sentUsersToOcalStorage = () => {
  localStorage.setItem("savedUsers", JSON.stringify(usersArr));
};

const getUsersFromLocalStorage = () => {
  const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
  usersArr.push(...savedUsers);
  for (let i = 0; i < savedUsers.length; i++) {
    showNewUser(savedUsers[i]);
  }
  //!
};

const getExistUser = (userLogin,usersArr) => {
  const userNameV = userLogin;
  const filterArr = usersArr.some((elem) => {
    if (elem.login == userNameV) {
      return true;
    }
  });
  return filterArr;
};

const deleteUser = (e) => {
  const t = e.target;
  const tDelete = t.slot;
  const id = t.title;

  if (tDelete !== "delete") return;
  const deleteIndex = usersArr.findIndex((elem) => elem.id == id);
  if (deleteIndex == -1) return;
  const delUser = document.getElementById(id);
  delUser.remove();
  usersArr.splice(deleteIndex, 1);
};

searchBtn.addEventListener("click", getUserFromGitHub);
users.addEventListener("click", deleteUser);
users.addEventListener("click", addPlusBtnUsers);
// users.addEventListener("click",deleteUserFromComparePage)

//--------------------------------------

//  imgBlock.style.display = "none";

//     users.innerHTML += `<div class="user">
//     <img src="${data.avatar_url}">
//     <h1>Name: ${data.name}</h1>
//     <p>Login: ${data.login}</p>
//     <p>Followers: ${data.followers}</p>
//     <p>Following: ${data.following}</p>
//     <p>Location: ${data.location}</p>
//     <p>Id: ${data.id}</p>
//     <p>Mode_id: ${data.node_id}</p>
//     <p>Updated at: ${data.updated_at}</p>
//     <p>User view type: ${data.user_view_type}</p>
//     <p>Public Repos: ${data.public_repos}</p>
//     <p>Public gists: ${data.public_gists}</p></div>`

// ok } no

function setUserNameLS() {
  const userNameV = userName.value;
  localStorage.setItem("userName", userNameV);
}

function getUserNameLS() {
  userName.value = localStorage.getItem("userName");
}

function changeBackgrondColor() {
  changeBackgrColor(theme, light);
}

function getThemeColorFromLocalST() {
  getThemeColorFromLocalSTorage(theme, light);
}

userName.addEventListener("input", setUserNameLS);
theme.addEventListener("click", changeBackgrondColor);
getUserNameLS();

getUsersFromLocalStorage();
getThemeColorFromLocalST();

// to JSON - stringify (string)
// form JSON - parse
