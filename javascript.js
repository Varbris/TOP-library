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

var newBookButton = document.getElementById("newButton");
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
            </div>
  `;
  card.addEventListener("click", function (event) {
    if (event.target.matches("#deleteBook")) {
      event.stopPropagation();
      deleteBook(event.target.dataset.bookid, myLibrary);
    }
  });
  li.append(card);
  return li;
}

function deleteBook(bookId, arrayBook) {
  var bookIndex = getBookIndex(bookId, arrayBook);
  arrayBook.splice(bookIndex, 1);
  console.log(arrayBook);
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
