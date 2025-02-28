const express = require('express');
const bodyParser = require('body-parser');
let books = []
app.post('/books',(res,req)=>{
    const {book_id , title , author , genre} = req.body
    if(!book_id || !title || !author || !genre){
        res.status(400).json({message:'Enter all the Fields'});
    }
    const BookFind = books.some(books=>books.book_id == book_id);
    if(BookFind){
        res.status(400).json({message:"This Book Already exists"});
    }
    const newBook = {book_id , title , author , genre}
    books.push(newBook);
    res.status(201).json({message:'new Book is created'})
})
app.get('/books',(res,req)=>{
    res.status(200).json({message:'found!'});
})
app.get('/books/:id',(res,req)=>{
    const book = books.find(books=>books.id == req.params.id)
    if(!book){
        res.status(400).json({mesage:'Book does not exits'})
    }
    res.status(200).json({book})
})

app.put('/book/:id',(res,req)=>{
    const bookIndex = books.findIndex(books=>books.book_id == req.params.id);
    if(bookIndex == -1){
     res.status(400).json({
        message:"Invalid BookIndex"
     })
     const UpdateBook = {...books[bookIndex],...req.body}
     books[bookIndex] = UpdateBook
     res.status(200).json({message:'OK!'});
    }
})
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
