const myLibrary = [];

function Book(title, author, pagesNumber) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pagesNumber = pagesNumber;
  this.info = function () {
    var bookInfo =
      this.title +
      " By " +
      this.author +
      ", " +
      this.pagesNumber +
      " pages, not read yet";
    return bookInfo;
  };
}

function addBookToLibrary(title, author, pagesNumber) {
  //take params, create a book then store it in the array
  const book = new Book(title, author, pagesNumber);
  myLibrary.push(book);
}

addBookToLibrary("awikwok", "aku", 100);
addBookToLibrary("awikwok", "aku", 100);
addBookToLibrary("awikwok", "aku", 100);
addBookToLibrary("awikwok", "aku", 100);
addBookToLibrary("awikwok", "aku", 100);
addBookToLibrary("awikwok", "aku", 100);
addBookToLibrary("awikwok", "aku", 100);

function displayBook(books) {
  const cardList = document.getElementById("cardList");

  myLibrary.forEach(function (book) {
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const li = document.createElement("li");
    card.classList.add("card");
    cardHeader.classList.add("card-header");
    cardBody.classList.add("card-body");
    cardHeader.innerHTML = `<h1> ${book.title} </h1>`;
    cardBody.innerText = book.info();
    card.append(cardHeader, cardBody);
    li.appendChild(card);
    cardList.appendChild(li);
  });
}

displayBook(myLibrary);
