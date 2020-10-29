const Book = require("../models/book.model.js");

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } else {

  // Save Book in the "database"
  Book.create(new Book(req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else {
        res.json(data);
       
    } 
  });
}
};

exports.delete = (req, res) => {
    Book.remove(req.body.book, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Books with title ${req.body.book}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Book with title " + req.body.book
          });
        }
      } else res.json({ message: `Book was deleted successfully!` });
    });
  };
  


// Retrieve all Books  from the 'database'.

  exports.findAll = (req,res) => {
  
  Book.getBookList(data,0,"",(delimitedstring) => {
 

     res.json(delimitedstring);
 
});
  }

// The instructions for this confused me. I made a seperate timer for the actual callback. Idk if that was correct

exports.saveItemsOnDatabase = (req, res) => {
       let  theitems = {};
        i = 0;
        let actualtimestart = new Date().getTime();
        let interval =  setInterval(function(){
           
            console.log(req.body[i].book);
            Book.saveItemOnDatabase( req.body[i],(err, data,actualtimeend) => {
            
            theitems[data.name] =   actualtimeend - actualtimestart;
            if(i == req.body.length - 1){
                console.log(theitems);
                res.json(theitems);
                clearInterval(interval);
            }
        })
        i++;
    },Math.random() * req.body[i].book);
   
  
}

  

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    
    Book.updateBook(
      req.body.original_book,
      req.body.new_book,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Book with title ${req.body.original_book}.`
            });
          } else if (err.kind === "already_exists") {
            res.status(409).send({message: `The book title ${req.body.new_book} already exists.`});
          } else {
            res.status(500).send({
              message: "Error updating Book with title " + req.body.new_book
            });
          }
        } else res.json(data);
      }
    );
  };