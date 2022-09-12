import React from 'react';
import { useState, useEffect } from 'react';
import { List } from './List';
import Swal from "sweetalert2";

const getData=()=>{
      const data = localStorage.getItem('booklist')
      if(data){
            return JSON.parse(data)
      }
      else{
            return []
      }
}

//save id when page refreshed
const idIncreament=()=>{
    const data2 = localStorage.getItem('id')
    if(data2){
          return JSON.parse(data2)
    }
    else{
          return []
    }
}


function Form(){


      const [books, setBooks] = useState(getData())

        //default id just a random number to tell the data type, what ever the default is the id will still start from 0 because useeffect from saveid
      const [id, setID] = useState(0)
      console.log("sss", id)

      const[saveid, setSaveid] = useState(idIncreament())
      const [title, setTitle] = useState()
      const [author, setAuthor] = useState()
      const [edited, setEdited] = useState(null)
      


      const handleAddBookSubmit=(e)=>{
            e.preventDefault()
          
            let book = {
                  id,
                  title,
                  author 
            }
            
           
            if (!title && !author) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Judul Buku dan Nama Penulis Harus di Isi'
                })
            } else if (!title && author) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Judul Buku Harus di Isi'
                })
            } else if (title && !author) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Nama Penulis Harus di Isi'
                })
            } else{
                if (!edited){
                    setBooks([...books,book])
                
                    //increament for id so data never has same id and id start consecutive from 0 (not random)
                    setID(id + 1) 
    
                
                    setTitle('')
                    setAuthor('')
                }else{
                    console.log("ini", id)
                
                    editBook(edited.id)
                    
                }
            }

            
              
        
     
         
      }
      
      const deleteBook=(id)=>{
        const filteredBooks=books.filter((element, index)=>{
        
            return element.id!== id
        })
        setBooks(filteredBooks)
      }

      const getBook=(id)=>{
        setID((prevValue) => prevValue)
        const editBooks=books.find((element, index)=>{
            return element.id=== id     
        })
        console.log("book", books)
    
        setEdited(editBooks)
     
        

      }

      const editBook=(id)=>{
        const judul = title;
        const penulis = author;
        let data = JSON.parse(localStorage.getItem('booklist'));
     

        const newData = data.map(element => {
            if (element.id === id) {
                return {
                    ...element,
                    title: judul,
                    author: penulis,
                    id: edited.id
                }
            }
            return element;
        })
   
        localStorage.setItem("booklist", JSON.stringify(newData));
  
        window.location.reload();
     
    
      }

        useEffect(() => {
            if (edited){
                
                console.log("ac", edited)
                setTitle(edited.title)
                setAuthor(edited.author)
            }else{
    
            }

            localStorage.setItem('booklist', JSON.stringify(books))
        
        
        }, [books, edited])

        //restore id from last saved id once after page refreshed
        useEffect(() => {
            setID(Number(saveid));
          }, []);

        //save last id every time id change
        useEffect(() => {
            console.log("ya", id)
            localStorage.setItem('id', JSON.stringify(id))
      
        }, [id]);

      return (
            <>  
              <div className='block h-auto  bg-github-darker-blue flex space-x-20'>
                <div className='h-96 mb-96 mt-60 w-0'></div>
                  <div className="mt-12 box-border border-github-border h-64 w-64 p-4 border-2 ...">
                    <div className='flex'>
                        <form className="text-white space-y-8 w-40 ml-4" onSubmit={handleAddBookSubmit}>
                            
                        

                            <div className='text-white'>
                                <label> Judul </label>
                                <input className="text-black p-1" type="text"  value={title} onChange={(e) => setTitle(e.target.value)}  />
                            </div>

                            <div className='text-white' >
                                <label> Penulis </label>
                                <input className="text-black p-1" type="text"  value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </div>

                            

                            <button value= {id} onClick={(e) => setID.Number(e.target.value)} type="submit" className="ml-8 bg-github-darker-grey hover:bg-github-border  text-github-another-grey font-bold  px-8 w-mid2 h-8 mb-20  rounded-lg">
                                Tambah
                                
                            </button>
                        
                        </form>

                            <div className=' w-80 space-x-4 text-white ml-40'>
                               
                                    {books.length> 0 &&<>
                           
                                   
                                        <div className='flex space-x-28'>
                                            <div className='w-20 ml-3'>Judul Buku</div>
                                    
                                            <div  className=''>Penulis</div>
                                        </div>
                                      
              
                                        <div className='mt-4'>
                                  
                                            <List deleteBook={deleteBook} editBook={getBook} books={books} ></List>
                              
                                        </div>
                                      

                                    </>}
                                    
                            </div>
                           
                            <div className=' flex text-white ml-40'>
                             
                                {books.length < 1 && <div  className='w-40'>Belum ada buku</div>}
                                {/* <p className="taskName">
                                    <span className="textBold">Judul :</span>
                                </p>
                                <p className="taskDate"><span className="textBold">Penulis : </span> </p> */}
                            </div>
                    
                        </div>
    
                    </div>
             
  
              </div>
     
            </>
        )
}

export default Form