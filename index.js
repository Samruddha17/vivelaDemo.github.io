const cardsContainer = document.querySelector(".cards_container");
const cards = document.querySelector(".cards");

// keep track of users mouse up and down
let isPressedDown = false;
// x horizontal space of cursor from inner container
let cursorXSpace;

cardsContainer.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  cursorXSpace = e.offsetX - cards.offsetLeft;
  //console.log(cards.offsetLeft);
  cardsContainer.style.cursor = "grabbing";
});

cardsContainer.addEventListener("mouseup", () => {
  cardsContainer.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
});

cardsContainer.addEventListener("mousemove", (e) => { 
  if (!isPressedDown) return;
  e.preventDefault();
  cards.style.left = `${e.offsetX - cursorXSpace}px`;
  boundCards();
});

cards.addEventListener("touchstart", (e) => {
  posX1 = e.touches[0].clientX;
});

cards.addEventListener("touchmove", (e) => {
  posX2 = posX1 - e.touches[0].clientX;
  posX1 = e.touches[0].clientX;
  cards.style.left = `${cards.offsetLeft - posX2}px`;
});

//this is used so that the cards do not outside of the cards container
function boundCards() {
  const container_rect = cardsContainer.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (parseInt(cards.style.left) > 0) {
    cards.style.left = 0;
  } else if (cards_rect.right < container_rect.right) {
    cards.style.left = `-${cards_rect.width - container_rect.width}px`;
  }
}
cards.style.left = `${0}px`;
function autoSlider() {
  let time = 20;

  const container_rect = cardsContainer.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (cards_rect.right < container_rect.right) {
    cards.style.left = `-${cards_rect.width - container_rect.width}px`;
  } else {
    cards.style.left = `${parseInt(cards.style.left) - 1}px`;
  }
}

setInterval("autoSlider()", 20);
window.onload = autoSlider;
