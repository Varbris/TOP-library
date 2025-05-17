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
  const cardHeader = document.createElement("div");
  const cardBody = document.createElement("div");
  const cardOption = document.createElement("div");
  const cardDeleteBtn = document.createElement("button");
  const imgDelete = document.createElement("img");
  const li = document.createElement("li");
  card.classList.add("card");
  cardHeader.classList.add("card-header");
  cardBody.classList.add("card-body");
  cardOption.classList.add("card-option");
  cardDeleteBtn.classList.add("project-button");
  imgDelete.setAttribute("src", "assets/icon/trash-can-outline.svg");
  imgDelete.setAttribute("alt", "deleteButton");
  imgDelete.setAttribute("class", "icon-size");
  cardDeleteBtn.appendChild(imgDelete);
  cardOption.appendChild(cardDeleteBtn);
  cardHeader.innerHTML = `<h1> ${bookObj.title} </h1>`;
  cardBody.innerText = bookObj.info();
  card.append(cardHeader, cardBody, cardOption);
  li.append(card);
  return li;
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
}
