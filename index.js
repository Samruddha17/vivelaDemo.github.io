const cardsContainer = document.querySelector(".cards_container");
const cards = document.querySelector(".cards");
cards.style.left = `${0}px`;
// keep track of users mouse up and down
let isPressedDown = false;

cardsContainer.addEventListener("mouseup", () => {
  cardsContainer.style.cursor = "grab";
});

cardsContainer.addEventListener("mouseup", () => {
  cards.classList.remove("transi");
  console.log(posX2);
  for (i = 0; i < 5; i++) {
    num = -400 * i;
    if (parseInt(cards.style.left) >= num && posX2 > 0) {
      console.log(num);
      cards.style.left = `${num}px`;
      break;
    } else if (parseInt(cards.style.left) >= num && posX2 < 0) {
      cards.style.left = `${num + 400}px`;
      break;
    }
  }
  boundCards();
  isPressedDown = false;
});

cardsContainer.addEventListener("mousedown", (e) => {
  posX1 = e.clientX;
  cards.classList.add("transi");
  //console.log(posX1 + "down");
  isPressedDown = true;
});

cardsContainer.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  posX2 = posX1 - e.clientX;
  //console.log(posX2 + " move");
  posX1 = e.clientX;
  cards.style.left = `${cards.offsetLeft - posX2}px`;
  cardsContainer.style.cursor = "grabbing";
  //console.log(cards.style.left + " left");
  boundCards();
});

cardsContainer.addEventListener("touchstart", (e) => {
  posX1 = e.touches[0].clientX;
  cards.classList.add("transi");
});

cardsContainer.addEventListener("touchmove", (e) => {
  posX2 = posX1 - e.touches[0].clientX;
  posX1 = e.touches[0].clientX;
  cards.style.left = `${cards.offsetLeft - posX2}px`;
  boundCards();
});

cardsContainer.addEventListener("touchend", (e) => {
  cards.classList.remove("transi");
  //console.log(posX2);
  for (i = 0; i < 6; i++) {
    if (window.innerWidth > 500) {
      num = -400 * i;
      x = 400;
    } else {
      num = -350 * i;
      x = 350;
    }
    console.log(cards.style.left + " " + num);
    console.log(i);
    if (parseInt(cards.style.left) >= num && posX2 > 0) {
      //console.log(num);
      cards.style.left = `${num}px`;
      break;
    } else if (parseInt(cards.style.left) >= num && posX2 < 0) {
      cards.style.left = `${num + x}px`;
      break;
    }
  }
  boundCards();
});

function boundCards() {
  const container_rect = cardsContainer.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  if (parseInt(cards.style.left) > 0) {
    cards.style.left = 0;
  } else if (cards_rect.right < container_rect.right) {
    cards.style.left = `-${cards_rect.width - container_rect.width}px`;
  }
}

//automatic slide show
function autoSlider() {
  const container_rect = cardsContainer.getBoundingClientRect();
  const cards_rect = cards.getBoundingClientRect();
  //console.log(cards.style.left);
  if (window.innerWidth > 500) {
    if (cards_rect.right <= container_rect.right) {
      cards.style.left = `-${cards_rect.width - container_rect.width}px`;
    } else {
      cards.style.left = `${parseInt(cards.style.left) - 400}px`;
      //console.log(parseInt(cards.style.left));
    }
  } else {
    if (cards_rect.right <= container_rect.right) {
      cards.style.left = `-${cards_rect.width - container_rect.width}px`;
    } else {
      cards.style.left = `${parseInt(cards.style.left) - 350}px`;
      //console.log(parseInt(cards.style.left));
    }
  }
}

setInterval("autoSlider()", 6000);
