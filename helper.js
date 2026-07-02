const imgBlock = document.querySelector(".img");
const URL_BACK = "https://api.github.com/users/";

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
