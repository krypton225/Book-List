/* *
 * This is a Book class for making an instance from it when adding one to table.
 */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI_Book {
  static displayBook() {
    const books = Storing.getBooks();

    books.forEach((book) => {
      UI_Book.addBookToTable(book);
    });
  }

  static addBookToTable(book) {
    const tBody = document.querySelector("#table-body");
    const oneRow = document.createElement("tr");

    oneRow.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><i class="icon fas fa-times"></i></td>`;

    tBody.appendChild(oneRow);
  }

  static deleteBook(myBook) {
    if (myBook.classList.contains("icon")) {
      myBook.parentElement.parentElement.remove();
    }
  }

  static showAlertMessage(msg, color) {
    const myElement = document.createElement("div");
    const myText = document.createTextNode(msg);

    myElement.className = "show-alert";
    myElement.style.backgroundColor = color;

    myElement.appendChild(myText);

    document.body.appendChild(myElement);
  }
}

class Storing {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addToLocalStorage(book) {
    const books = Storing.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeToLocalStorage(bookTitle) {
    const books = Storing.getBooks();

    books.forEach((bk, idx) => {
      if (bk.title === bookTitle) {
        books.splice(idx, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// * Adding to table.
document.querySelector("#submitForm").addEventListener("click", (e) => {
  e.preventDefault();

  let myTitle = document.getElementById("bookListTitle");
  let myAuthor = document.getElementById("bookListAuthor");

  if (myTitle.value === "" || myAuthor.value === "") {
    alert("Please, Enter all inputs!");
  } else {
    const myBook = new Book(myTitle.value, myAuthor.value);

    UI_Book.addBookToTable(myBook);

    Storing.addToLocalStorage(myBook);

    myTitle.value = "";
    myAuthor.value = "";

    UI_Book.showAlertMessage("Your book was added!", "rgb(52, 92, 52)");

    setTimeout(() => {
      document.querySelector(".show-alert").remove();
    }, 2500);

    myTitle.focus();
  }
});

// * Draw the content into the table.
document.addEventListener("DOMContentLoaded", UI_Book.displayBook);

// * Delete the item from the table.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#table-body").addEventListener("click", (e) => {
    UI_Book.showAlertMessage("Your book was deleted!", "rgb(170, 49, 70)");

    setTimeout(() => {
      document.querySelector(".show-alert").remove();
    }, 2500);

    UI_Book.deleteBook(e.target);

    Storing.removeToLocalStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );
  });
});
