//await itself resolves the promise
//async adds/gives a promise

//for fetching data we recive 2 promisces and we have to resolve both of them
//hence we use 2 await methods
async function getIdeas() {
  let url = "ideas.json";
  try {
    //resvoles 1st promise
    let res = await fetch(url);
    //resolves another promise
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderIdeas() {
  //this returns the resolved promise
  let ideas = await getIdeas();
  console.log(ideas);
  let html = "";
  ideas.forEach((idea) => {
    console.log(idea.id);
    let htmlSegment = `<div class="itemContainer">
        <div class="items">
            <img src="${idea.imageURL}" alt="">
            <div class="imageInfo">
                <h2>${idea.imageTitle}</h2>
                <p>${idea.imageInfo}</p>
                <button>Read More</button>
            </div>
         </div>
    </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector(".ideasContainer");
  container.innerHTML = html;
}

renderIdeas();
