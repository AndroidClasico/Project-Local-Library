
//two params in this order: accounts = array() of account{}
// id = string id of single account{}
//returns account{} that has matching id
// FIND METHOD
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id.includes(id));
}



//returns SORTed array of provided acct{}
//{} are sorted alphabetically by last name
//SORT METHOD
function sortAccountsByLastName(accounts) {
  return accounts.sort((lastA,lastB) => 
    lastA.name.last.toLowerCase() > lastB.name.last.toLowerCase() ? 1 : -1
  );
}


//returns a number that represents number of times accounts ID appears in ANY books borrows array
//REDUCE METHOD
// params SPECIFIC account{} & array of book{}
                                        
////////////////////
function getTotalNumberOfBorrows(account, books) {
  const userId = account.id;
   
  let accumulator = 0;
  const total = books.reduce((acc, book) => {
    const borrowRecord = book.borrows;
    const mapIds = borrowRecord.map((record) => record.id);
    if (mapIds.includes(userId)) acc++;
    return acc;
  }, accumulator);
  
  return total;
}
  
  
// params 1) account{}; 2) book( {} ); 3) authors( {} )
//returns book ( {} ), INCLUDES author info that represents ALL BOOKS CURRENTLY CHECKED OUT by given account
//author{} nested inside book{}
function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let result = borrowedBooks.map((book) => {
    return { ...book, author: getAuthor(book, authors) };
  });
  return result;
}

// Helper function
// Returns author object
function getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};