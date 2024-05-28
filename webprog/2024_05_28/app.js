document.addEventListener("DOMContentLoaded", function() {
    const cardContainer = document.getElementById("cardContainer");
    const saveButton = document.getElementById("button1");

    function loadBooks() {
        fetch("http://localhost:5000/Konyv")
            .then(response => response.json())
            .then(data => displayBooks(data))
            .catch(error => console.error("Error fetching data:", error));
    }

    function displayBooks(books) {
        cardContainer.innerHTML = ""; // Clear the list
        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookCard.style.width = "18rem";
            bookCard.innerHTML = `
                <img class="card-img-top" src="${book.kepneve}" alt="Card image cap">
                <div class="card-body">
                    <h3 class="card-title">${book.nev}</h3>
                    <h2 class="card-subtitle mb-2 text-muted">${book.kiadasEve}</h2>
                    <p class="card-text">Könyv értékelése: ${book.ertekeles}</p>
                    <button type="button" onclick="deleteBook(${book.id})" class="btn btn-danger">Törlés</button>
                    <button type="button" onclick="editBook(${book.id}, '${book.nev}', ${book.kiadasEve}, ${book.ertekeles}, '${book.kepneve}')" class="btn btn-warning">Szerkesztés</button>
                </div>
            `;
            cardContainer.appendChild(bookCard);
        });
    }

    window.deleteBook = function(bookId) {
        fetch(`http://localhost:5000/Konyv/${bookId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                loadBooks(); // Refresh the book list after deletion
            } else {
                console.error("Error deleting book:", response.statusText);
            }
        })
        .catch(error => console.error("Error deleting book:", error));
    };

    window.editBook = function(bookId, name, year, rating, image) {
        // Implement the book editing functionality here
        console.log(`Edit book: ${bookId}, ${name}, ${year}, ${rating}, ${image}`);
    };

    if (saveButton) {
        saveButton.addEventListener("click", function() {
            const name = document.getElementById("name").value;
            const kiadev = document.getElementById("kiadev").value;
            const ertekeles = document.getElementById("ertekeles").value;
            const kepURL = document.getElementById("kepURL").value;

            const newBook = {
                nev: name,
                kiadasEve: kiadev,
                ertekeles: ertekeles,
                kepneve: kepURL
            };

            fetch("http://localhost:5000/Konyv", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBook)
            })
            .then(response => {
                if (response.ok) {
                    loadBooks(); // Refresh the book list after adding a new book
                } else {
                    console.error("Error adding new book:", response.statusText);
                }
            })
            .catch(error => console.error("Error adding new book:", error));
        });
    }

    loadBooks();
});
