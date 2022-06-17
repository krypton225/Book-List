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
    const storedBooks = [
      {
        title: "First",
        author: "Khaled",
      },
      {
        title: "Second",
        author: "Mohamed",
      },
    ];

    const books = storedBooks;

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
            <td><i class="fas fa-times"></i></td>`;

    tBody.appendChild(oneRow);
  }
}

// * Adding to table.
document.querySelector("#submitForm").addEventListener("click", (e) => {
  e.preventDefault();

  let myTitle = document.getElementById("bookListTitle");
  let myAuthor = document.getElementById("bookListAuthor");

  const myBook = new Book(myTitle.value, myAuthor.value);

  UI_Book.addBookToTable(myBook);

  myTitle.value = "";
  myAuthor.value = "";

  myTitle.focus();
});

// * Delete the item from the table and local storage.
document.addEventListener("DOMContentLoaded", UI_Book.displayBook);
