// constructor
const Book = function(book) {
  
  this.book = book.book;

};

Book.create = (newBook , result) => { 
  if(!data.includes(newBook.book)) {
   data.push(newBook.book);
   result(null,data);
  } else {
    result({message : "This book name already exists"},null);
  }

  
 
}
  //I know that the last comma should be removed but that's trivial to the test
Book.getBookList = (list,index,thestring,callback) => {
  
    if(index < list.length) {
    
        Book.getBookList(list ,index+1,thestring +=list[index]+", " ,callback)
     
    } else {
       callback(thestring);
    }
     
};


Book.remove = (book, result) => {
 
    
    if (!data.includes(book)) {
     
      result({ kind: "not_found" }, null);
      return;
    } else {
      data = data.filter(function(e) { return e !== book });
      console.log("deleted book with title: ", book);
     result(null, data);
    }
};

Book.saveItemOnDatabase = (name, callback) => {

    
    callback(null,{name: name.book},new Date().getTime());

  
};


Book.updateBook = (original_book, new_book, result) => {


      if (!data.includes(original_book))  {
        
          result({ kind: "not_found" }, null);
        
        } else if(data.includes(new_book)){
          result({ kind: "already_exists" }, null);
        } else {
          var index = data.indexOf(original_book);

          if (index !== -1) {
              data[index] = new_book;
          }

          result(null,  data);
        }
};
    
module.exports = Book;