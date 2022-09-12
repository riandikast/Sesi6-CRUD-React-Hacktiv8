import React from "react";

export const List = ({books, deleteBook, editBook}) =>{
      return books.map(book=>(
  
                  <tr key={book.id}>
                        <div className='flex '>
                              <div className='w-20 mb-3 mr-28'>{book.title}</div>
                              <div className='w-20'>{book.author}</div>
                              <button onClick= {() => editBook(book.id)} className="mr-4 bg-github-darker-grey hover:bg-github-border  text-github-another-grey font-bold  w-20 h-6 rounded-lg">Edit</button>
                              <button onClick= {() => deleteBook(book.id)}  className=" bg-github-darker-grey hover:bg-github-border  text-github-another-grey font-bold  w-20 h-6 rounded-lg">Delete</button>
                        </div>
                    
                  
                  </tr>
  
        
      ))
}