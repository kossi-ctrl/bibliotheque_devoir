

const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('sideMenu');

hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('open');

    if (sideMenu.classList.contains('open')) {
        document.body.style.marginLeft = "250px"; 
    } else {
        document.body.style.marginLeft = "0";     
    }
});

    

document.addEventListener("DOMContentLoaded", () => {
  const btnTop = document.getElementById("btnTop");

  if (!btnTop) return;

  
  window.addEventListener("scroll", () => {
    btnTop.style.display = window.scrollY > 200 ? "block" : "none";
  });


  btnTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


const highlightBook = {
  title: "Le Petit Prince",
  author: "Antoine de Saint-Exupéry",
  year: 1943,
  cover: "images/petit_prince.png"
};

const highlightDiv = document.getElementById ("highlight-book");
if (highlightBook && highlightDiv) {
    const img = document.createElement ("img");
    img.src = highlightBook.cover;
    
    const info = document.createElement("div");
    info.innerHTML = `<strong>${highlightBook.title}</strong><br>${highlightBook.author} (${highlightBook.year})`;
    highlightDiv.appendChild(img);
    highlightDiv.appendChild(info);
}


const news = [
  {
    text: "Nouvelle exposition à la bibliothèque.",
    image: "images/exposition.jpg",
    url: "exposition.html"
  },
  {
    text: "Ateliers pour enfants ce week-end.",
    image: "images/enfants.jpg",
    url: "ateliers.html"
  },
  {
    text: "Inscriptions ouvertes pour le club de lecture.",
    image: "images/club.png",
    url: "club.html"
  }
];


document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("news-list");
    if(!newsList) return;
        
        news.forEach(item => {
            const li = document.createElement("li");

            const link = document.createElement("a");
    link.href = "actualites-detail.html"; 
    link.style.textDecoration = "none";
    link.style.color = "inherit";
    link.style.display = "block";

    link.addEventListener("click", (e) => {
      localStorage.setItem("selectedNews", JSON.stringify(item));
    });

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = "Illustration actualité";
            img.style.width = "100%";
            img.style.height = "auto";
            img.style.borderRadius = "6px";

            const span = document.createElement("span");
            span.textContent = item.text;
            span.style.display = "block";
            span.style.marginTop = "8px";
            span.style.fontSize = "16px";

            link.appendChild(img);
            link.appendChild(span);
            li.appendChild(link);

            newsList.appendChild(li);
        });
});

document.addEventListener("DOMContentLoaded", ()=>{
  const livresList = document.getElementById("livres-list");
  const searchInput = document.getElementById("search-books");
  const genreSelect = document.getElementById("genre");

 let books = [];

fetch ("livres.json")
    .then (res => res.json())
    .then (data => {
    books = data.books; 
    displayBooks (books);
})
.catch(err => console.error ("Erreur JSON :", err));
  
  function displayBooks(list) {
      if (!livresList)return;
      livresList.innerHTML = '';
      
      list.forEach(book => {
          const div = document.createElement('div');
          div.className = 'book';

          if (book.cover) {
      const img = document.createElement('img');
      img.src = book.cover;
      img.alt = "Couverture de " + book.title;
      img.className = "book-cover";
      div.appendChild(img);
    }

          const info = document.createElement('div');
          info.innerHTML = 
              `<strong>${book.title}</strong><br>
              ${book.author} (${book.year})<br>
              <em>${book.genre}</em>`;
          div.appendChild(info);
          livresList.appendChild(div);
      });
  }
  
  function filterBooks() {
      const search = searchInput.value.toLowerCase();
      const genre = genreSelect.value;

      const filtered = books.filter(book => {
          const matchesSearch = book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search);
          const matchesGenre = genre === '' || book.genre === genre;
          return matchesSearch && matchesGenre;
      });

      displayBooks(filtered);
  }

  
  searchInput.addEventListener('input', filterBooks);
  genreSelect.addEventListener('change', filterBooks);
});



document.addEventListener("DOMContentLoaded", function(){
const eventsList = document.getElementById("evenements-list");
const searchEventsInput = document.getElementById ("search-events");

let events = [];

fetch("events.json")
  .then (res => res.json())
    .then (data => {
    events = data.events; 
    displayEvents (events);
})
.catch(function(error){
    console.error("Erreur JSON :", error);
});

function displayEvents(list) {
    if(!eventsList)return;
        
    eventsList.innerHTML = '';
    list.forEach(function (ev){
        const div = document.createElement('div');
        div.className = 'event';
       
        if (ev.image){
        const img = document.createElement('img');
        img.src = ev.image;
        img.alt = "Image de" + ev.title;  
        div.appendChild(img);
    }
        const info = document.createElement('div');
        info.className ='event-info';
        info.innerHTML = 
        `<strong>${ev.title}</strong><br>
              ${ev.date})<br>
              <em>${ev.description}</em>`;
          
        div.appendChild(info);
        eventsList.appendChild(div);
    });
}
 function filterEvents() {
        const search = (searchEventsInput.value || '').toLowerCase();
        
        const filtered = events.filter(ev =>
            (ev.title || '').toLowerCase().includes(search) ||
            (ev.description || '').toLowerCase().includes(search)
        );

        displayEvents(filtered);
    }

    searchEventsInput.addEventListener('input', filterEvents);
});

