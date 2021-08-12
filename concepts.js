// function popClick(clicked) {

//     //on pop up dotn let the main page scroll
//     document.body.style.overflow = "hidden";
//     var allElements = document.getElementsByTagName("*");
//     for (var i = 0, len = allElements.length; i < len; i++) {
//         var element = allElements[i];
//         element.classList.add("scrolling");
//     }
//     //gets id of the conatiner of the image clicked
//     var image_click = document.getElementById(clicked);
//     //gets id of popup container to make display block
//     var y = document.getElementById("pop");
//     y.style.overflow = "scroll";
//     var z = document.getElementById("dynamicContent");

//     //for preivios and next concept
//     var next = document.getElementById("next");
//     var prev = document.getElementById("prev");
//     console.log(image_click.id);

//     //2nd child of popup conatiner ie popup_image
//     console.log(y.children[2]);
//     //gets attribute of the 0th child ie img.the attribute here is the src of img
//     console.log(image_click.children[0].getAttribute("src"));

//     //change background image of popup container to the background image of the clicked image
//     //make popup window vivble
//     z.children[0].style.backgroundImage = 'url("' + image_click.children[0].getAttribute("src") + '")';
//     y.style.display = "block";

//     // for next click

//     next.onclick = function () {
//         //store id of the next image (+1) in new_image
//         new_image = Number(image_click.id) + 1;
//         console.log(new_image);
//         if (new_image < 7) {
//             //replace the info of image_click variable with the data of next image(new_image)
//             //then change background image of popup container to the background image of this image
//             image_click = document.getElementById(new_image);
//             //for animation
//             z.classList.toggle("animatePopup");
//             //when animation ends, this is called
//             z.addEventListener('animationend', animationEndCallback);
//             setTimeout(change, 500);
//             function change() {
//                 z.children[0].style.backgroundImage = 'url("' + image_click.children[0].getAttribute("src") + '")';
//             }
//         }
//         else {
//             //dp nothing
//         }

//     }

//     //same as next function but just going reverse
//     prev.onclick = function () {

//         new_image = Number(image_click.id) - 1;
//         console.log(new_image);
//         if (new_image > 0) {
//             image_click = document.getElementById(new_image);
//             z.classList.toggle("animatePopup");
//             z.addEventListener('animationend', animationEndCallback);
//             setTimeout(prevChange, 500);
//             function prevChange() {
//                 z.children[0].style.backgroundImage = 'url("' + image_click.children[0].getAttribute("src") + '")';
//             }
//         }
//         else {
//             //do nothing
//         }
//     }

//     //when animation ends remove active class
//     animationEndCallback = (e) => {
//         z.removeEventListener('animationend', animationEndCallback);
//         z.classList.remove("animatePopup");
//     }
// }

//concepts navbar
const filterItem = document.querySelector(".concept_nav");
const filterImg = document.querySelectorAll(".image_item");

window.onload = () => {
  // for default ie concept1
  let defaultItem = filterItem
    .querySelector(".active")
    .getAttribute("data-name");
  filterImg.forEach((image) => {
    let defaultImages = image.getAttribute("data-name");
    if (defaultItem == defaultImages) {
      image.classList.add("show");
    } else {
      image.classList.add("hide");
      image.classList.remove("show");
    }
  });

  filterItem.onclick = (selectedItem) => {
    //if we click on any items in the concept nav
    if (selectedItem.target.classList.contains("item")) {
      //console.log(filterItem.querySelector(".active"));
      //removes the current/default active item
      filterItem.querySelector(".active").classList.remove("active");
      //makes the clicked item active
      selectedItem.target.classList.add("active");
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImg.forEach((image) => {
        let filterImages = image.getAttribute("data-name");
        if (filterImages == filterName) {
          console.log(filterImages);
          image.classList.add("show");
        } else {
          image.classList.add("hide");
          image.classList.remove("show");
        }
      });
    }
  };
};

function popClick(clicked) {
  //on pop up dotn let the main page scroll
  document.body.style.overflow = "hidden";
  var allElements = document.getElementsByTagName("*");
  for (var i = 0, len = allElements.length; i < len; i++) {
    var element = allElements[i];
    element.classList.add("scrolling");
  }
  //gets id of the conatiner of the image clicked
  var image_click = document.getElementById(clicked);
  //gets id of popup container to make display block
  var y = document.getElementById("pop");
  y.classList.remove("animateClose");
  y.style.overflow = "scroll";
  var z = document.getElementById("dynamicContent");

  //for preivios and next concept
  var next = document.getElementById("next");
  next.style.display = "flex";
  var prev = document.getElementById("prev");
  prev.style.display = "flex";
  console.log(image_click.id);

  //2nd child of popup conatiner ie popup_image
  console.log(y.children[2]);
  //gets attribute of the 0th child ie img.the attribute here is the src of img
  console.log(image_click.children[0].getAttribute("src"));

  //change background image of popup container to the background image of the clicked image
  //make popup window vivble
  z.children[0].style.backgroundImage =
    'url("' + image_click.children[0].getAttribute("src") + '")';
  y.style.display = "block";
  //for last images of each concept
  if (image_click.id < 25 && image_click.id > 19) {
    next.style.display = "none";
  }
  if (image_click.id < 6 && image_click.id > 0) {
    prev.style.display = "none";
  }

  relatedConcepts();
  // for next click

  next.onclick = function () {
    prev.style.display = "flex";
    refreshRelatedConcepts();
    console.log(image_click.id);
    //store id of the next image (+1) in new_image
    new_image = Number(image_click.id) + 1;

    image_click = document.getElementById(new_image);
    let inSelectedCategory = image_click.classList.contains("show");
    console.log(image_click.classList.contains("show"));

    //skip the images which are not visisble or not in the specific category
    while (inSelectedCategory == false && new_image < 25) {
      new_image = new_image + 1;
      if (new_image < 25 && new_image > 19) {
        next.style.display = "none";
      }
      console.log(new_image);
      image_click = document.getElementById(new_image);
      inSelectedCategory = image_click.classList.contains("show");
    }

    if (new_image < 25) {
      //replace the info of image_click variable with the data of next image(new_image)
      //then change background image of popup container to the background image of this image
      //for animation
      z.classList.toggle("animatePopup");
      //when animation ends, this is called
      z.addEventListener("animationend", animationEndCallback);
      setTimeout(change, 500);
      function change() {
        z.children[0].style.backgroundImage =
          'url("' + image_click.children[0].getAttribute("src") + '")';
      }
    }
    relatedConcepts();
  };

  //same as next function but just going reverse
  prev.onclick = function () {
    next.style.display = "flex";
    refreshRelatedConcepts();
    console.log(image_click.id);
    new_image = Number(image_click.id) - 1;

    image_click = document.getElementById(new_image);
    console.log(new_image);
    let inSelectedCategory = image_click.classList.contains("show");
    //skip the images which are not visisble or not in the specific category
    while (inSelectedCategory == false && new_image > 0) {
      new_image = new_image - 1;
      if (new_image < 6 && new_image > 0) {
        prev.style.display = "none";
      }
      console.log(new_image);
      image_click = document.getElementById(new_image);
      inSelectedCategory = image_click.classList.contains("show");
      console.log(inSelectedCategory);
    }

    if (new_image > 0) {
      image_click = document.getElementById(new_image);
      z.classList.toggle("animatePopup");
      z.addEventListener("animationend", animationEndCallback);
      setTimeout(prevChange, 500);
      function prevChange() {
        z.children[0].style.backgroundImage =
          'url("' + image_click.children[0].getAttribute("src") + '")';
      }
    }
    relatedConcepts();
  };

  //when animation ends remove active class
  animationEndCallback = (e) => {
    z.removeEventListener("animationend", animationEndCallback);
    z.classList.remove("animatePopup");
  };
}

function closePop() {
  //comment below line for WORDPRESS
  document.body.style.overflow = "scroll";
  var y = document.getElementById("pop");

  //scrolling for wordpress
  var allElements = document.getElementsByTagName("*");
  for (var i = 0, len = allElements.length; i < len; i++) {
    var element = allElements[i];
    element.classList.remove("scrolling");
  }
  refreshRelatedConcepts();
  y.classList.add("animateClose");
  setTimeout(() => {
    y.scrollTo(0, 0);
    y.style.display = "none";
  }, 1000);
}

//Related concepts arrow functions
function relatedConcepts() {
  var nextRelated = document.getElementById("relatedRightArrow");
  var prevRelated = document.getElementById("relatedLeftArrow");

  nextRelated.onclick = function () {
    //console.log(nextRelated);
    var all = document.querySelectorAll(".related_items");
    for (i = 0; i < all.length - 3; i++) {
      if (all[i].classList.contains("relatedShow")) {
        if (
          screen.width < 770 &&
          screen.width > 500 &&
          all[i + 3].id == "non_ipad"
        ) {
          console.log("ipad");
          continue;
        } else if (
          screen.width < 500 &&
          (all[i + 3].id == "non_ipad" || all[i + 3].id == "non_phone")
        ) {
          continue;
        }
        all[i].classList.remove("relatedShow");
        all[i].classList.add("relatedHide");
        all[i + 3].classList.remove("relatedHide");
        all[i + 3].classList.add("relatedShow");
        break;
      }
    }
  };

  prevRelated.onclick = function () {
    //console.log(prevRelated);
    var all = document.querySelectorAll(".related_items");
    //console.log(all);
    for (i = all.length - 1; i > 2; i--) {
      if (all[i].classList.contains("relatedShow")) {
        all[i].classList.remove("relatedShow");
        all[i].classList.add("relatedHide");
        all[i - 3].classList.remove("relatedHide");
        all[i - 3].classList.add("relatedShow");
        break;
      }
    }
  };
}

function refreshRelatedConcepts() {
  //related Concepts functionality , revert to original
  var all = document.querySelectorAll(".related_items");
  for (i = 0; i < all.length; i++) {
    if (i < 3) {
      if (all[i].classList.contains("relatedHide")) {
        all[i].classList.remove("relatedHide");
        all[i].classList.add("relatedShow");
      }
    } else {
      if (all[i].classList.contains("relatedShow")) {
        all[i].classList.remove("relatedShow");
        all[i].classList.add("relatedHide");
      }
    }
  }
}
