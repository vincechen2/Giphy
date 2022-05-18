const api_key = "65QOHB4E2SqaMchKakxio935KRLud7Pl";
const limit = 9;
let offset = 0;

let searchbar = document.getElementById("search");
let form = document.getElementById("form");
let load = document.getElementById("load");
load.addEventListener("click", populate);
form.addEventListener("submit", () => {
  search = searchbar.value;

  let container = document.getElementById("gif-list");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  populate();
  searchbar.value = "";
});

window.onload = () => {
    
};

async function getData() {
  let d = await fetch(
    "http://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + search
  );
  return await d.json();
}

async function populate() {
  let data = await getData();
  let container = document.getElementById("gif-list");
  let l = 0;
  for (offset; offset < data.data.length; offset++) {
    if (l >= limit) break;

    let c = document.createElement("div");
    c.className = "imagewrap";
    let i = document.createElement("img");
    i.src = data.data[offset].images.original.url;
    i.alt = search;
    c.append(i);
    container.append(c);
    l++;
  }

  let loadButton = document.getElementById("load");
  loadButton.className = "";
  if (offset >= data.data.length) loadButton.className = "hidden";
}
