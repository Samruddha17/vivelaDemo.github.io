const cardsContainer = document.querySelector(".cards_container");
const cards = document.querySelector(".cards");
cards.style.left = `${0}px`;
// keep track of users mouse up and down
let isPressedDown = false;

cardsContainer.addEventListener("mouseup", () => {
  cardsContainer.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
});

cardsContainer.addEventListener("mousedown", (e) => {
  posX1 = e.clientX;
  //console.log(posX1 + "down");
  isPressedDown = true;
});

cardsContainer.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  posX2 = posX1 - e.clientX;
  console.log(posX2 + " move");
  posX1 = e.clientX;
  cards.style.left = `${cards.offsetLeft - posX2}px`;
  cardsContainer.style.cursor = "grabbing";
  //console.log(cards.style.left + " left");
  if (parseInt(cards.style.left) > 0) {
    cards.style.left = `${0}px`;
  }
});

cardsContainer.addEventListener("touchstart", (e) => {
  posX1 = e.touches[0].clientX;
});

cardsContainer.addEventListener("touchmove", (e) => {
  posX2 = posX1 - e.touches[0].clientX;
  posX1 = e.touches[0].clientX;
  cards.style.left = `${cards.offsetLeft - posX2}px`;
  if (parseInt(cards.style.left) > 0) {
    cards.style.left = `${0}px`;
  }
});

//automatic slide show
function autoSlider() {
  const container_rect = cardsContainer.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (cards_rect.right < container_rect.right) {
    cards.style.left = `-${cards_rect.width - container_rect.width}px`;
  } else {
    cards.style.left = `${parseInt(cards.style.left) - 1}px`;
  }
}

window.onload = setInterval("autoSlider()", 20);
