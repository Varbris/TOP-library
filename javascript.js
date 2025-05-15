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
