const books = require("../controllers/book.controller.js");

module.exports = (app) => {

    // Create a new Book
    app.post("/", books.create);

     // Delete a Book with title
    app.delete("/", books.delete);

   
    app.patch("/",books.update);
  
    // Retrieve all Books
    app.get("/", books.findAll);

    app.put("/", books.saveItemsOnDatabase);
    

};