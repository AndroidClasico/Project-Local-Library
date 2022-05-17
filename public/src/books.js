function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
};

//find
function findBookById(books, id) {
  const found = idFinder(books, id);
  return found;
}

function idFinder(array, id) {
  return array.find((index) => index.id == id);
}

function partitionBooksByBorrowedStatus(books) {
  let isCheckedOut = books.filter((book) => !book.borrows[0].returned);
  let isReturned = books.filter((book) => book.borrows[0].returned);
  return [isCheckedOut, isReturned];
};


//return an array of 10 or less acct{}s that represents the acct giben by ID in borrows array
//each acct{} should INCLUDE returned entry from corresponding transaction object in borrows array
function getBorrowersForBook(book, accounts) {
  // `borrows` is a list of transactions, each of type { id: string, returned: true }
  const { borrows } = book;

  const borrowers = borrows.map(({ id, returned })=> {
    // find account that matches the borrower's ID
    const account = accounts.find(account => account.id === id);

    // return the matching account, along with the `returned` info
    return {
      ...account,
      returned,
    };
  });

  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};