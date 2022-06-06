let liked = document.getElementsByClassName("fa-solid fa-heart");
let hated = document.getElementsByClassName("fa-solid fa-heart-crack");
let trash = document.getElementsByClassName("fa-ban");
let feedBack = document.getElementsByClassName("submit");
document.getElementById("submit").addEventListener("click", getBook);

function getBook() {
  let lookUp = document.getElementById("lookUp").value;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${lookUp}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let bookCover = data.items[0].volumeInfo.imageLinks.thumbnail;
      document.getElementById(
        "displayHere"
      ).innerHTML = `<form action="/savedToDatabase" method="POST"> 
      <input type="text" placeholder="Input book name here!" name="bookName">
      <input type="text" value="${bookCover}" name="url">
      <button type="submit">Save To Database</button>
    </form>`;
    // document.getElementById('displayUrl').innerHTML= data.items[0].volumeInfo.imageLinks.smallThumbnail
   
    });
}

Array.from(liked).forEach(function (element) {
  element.addEventListener("click", function () {
    const url = this.parentNode.parentNode.childNodes[3].innerText;
    const liked = this.parentNode.parentNode.childNodes[4].innerText;
    fetch("savedToDatabase", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        liked: liked,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(url);
        document.getElementById('bookCover').src= url
        window.location.reload(true);
      });
  });
});

Array.from(hated).forEach(function (element) {
  element.addEventListener("click", function () {
    const url = this.parentNode.parentNode.childNodes[3].innerText;
    const hated = this.parentNode.parentNode.childNodes[5].innerText;
  
    fetch("savedToDatabase2", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: url,
        hated: hated,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(url);
        document.getElementById('bookCover').src= url
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const img = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("savedToDatabase", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        img: img,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
