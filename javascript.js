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

var newBookButton = document.getElementById("newBookButton");
var modal = document.getElementById("modal");
newBookButton.addEventListener("click", function () {
  modal.showModal();
});

var addBookBtn = document.getElementById("addBook");
addBookBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var title = document.getElementById("title");
  var author = document.getElementById("author");
  var pageNumber = document.getElementById("pageNumber");
  title = title.value;
  author = author.value;
  pageNumber = pageNumber.value;
  addBookToLibrary(title, author, pageNumber);
  displayBook(myLibrary);
  modal.close(title);
});

function createCard(bookObj) {
  const card = document.createElement("div");
  const li = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
            <div class="card-header">
            <h2> ${bookObj.title} </h2>
            </div>
            <div class="card-body">
            ${bookObj.info()}
            </div>
            <div class="card-option">
              <button class="project-button" id="deleteBook" data-bookId ="${
                bookObj.id
              }">
              <span class="icon-size delIcon"></span>
              </button>
              <button class="project-button" id="toggleRead" data-bookId ="${
                bookObj.id
              }" data-isread="false">
              <span class="icon-size checkIcon"></span>
              </button>
            </div>
  `;
  card.addEventListener("click", function (e) {
    if (e.target.matches("#deleteBook")) {
      e.stopPropagation();
      deleteBook(e.target.dataset.bookid, myLibrary);
      displayBook(myLibrary);
    }
  });
  card.addEventListener("click", checkBook);
  li.append(card);
  return li;
}

function checkBook(e) {
  if (e.target.matches("#toggleRead") && e.target.dataset.isread === "false") {
    e.stopPropagation();
    e.target.dataset.isread = "true";
    isBookRead(e.target.dataset.bookid, myLibrary, e.target.dataset.isread);
  } else {
    e.target.dataset.isread = "false";
    isBookRead(e.target.dataset.bookid, myLibrary, e.target.dataset.isread);
  }
}

function isBookRead(bookId, arrayBook, evRead) {
  var bookIndex = getBookIndex(bookId, arrayBook);
  Book.prototype.isBookReaded = function () {
    this.isRead = evRead;
  };
  arrayBook[bookIndex].isBookReaded();
}

function deleteBook(bookId, arrayBook) {
  var bookIndex = getBookIndex(bookId, arrayBook);
  arrayBook.splice(bookIndex, 1);
}

function getBookIndex(bookId, arrayBook) {
  var bookIndex;
  arrayBook.forEach(function (book, index) {
    if (book.id === bookId) {
      bookIndex = index;
    }
  });
  return bookIndex;
}

function displayBook(books) {
  const cardList = document.getElementById("cardList");
  cardList.innerHTML = "";
  books.forEach(function (book) {
    var element = createCard(book);
    cardList.appendChild(element);
  });
}

if (myLibrary.length === 0) {
  modal.showModal();
} else {
  displayBook(myLibrary);
}
