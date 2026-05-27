import React from 'react'
import { useState,useEffect } from 'react'

function App() {
  //load data from local storage when app loads
  const [Task, setTask] = React.useState(()=>{
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  })
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  //save data to local storage whenever Task changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(Task));
  }, [Task]);
  const submitHandler = (e) => {
    e.preventDefault()
    if(title=='' || content===''){
      alert('Please Add note title and content')
      return
    }
    else{
    const copyTask=[...Task];
    copyTask.push({title,content})
    setTask(copyTask)
    setTitle('')
    setContent('')
    }
  }
  const deleteNote=(idx)=>{
    const copyTask=[...Task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  }
  return (
    <div className='h-screen scrollbar-none overflow-auto lg:flex bg-black text-white'>
      <form  onSubmit={(e)=>{submitHandler(e)}} className='mt-10 lg:w-1/2 flex gap-4  flex-col items-start  p-10'>
          <input
            type='text'
            placeholder='Title'
            className=' w-full px-5 font-medium py-2 outline-none border-2 rounded'
            value={title} onChange={(e)=>{setTitle(e.target.value)}}
          />
          <textarea
            placeholder='Content'
            className=' w-full h-40 flex-row font-medium px-5 py-2 outline-none border-2 rounded'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='items-center outline-none w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            Add Note
          </button>
      </form>
      <div className='lg:w-1/2 lg:border-l lg:border-white  flex gap-4  flex-col items-start  p-10'>
      <h1 className='w-full text-2xl font-bold'>Recent Notes</h1>
        <div className='flex mt-2 gap-5 flex-wrap'>
          {Task.map((elm,idx)=>{
            return(
          <div key={idx} className='flex flex-col gap-2 p-3 h-64 w-48 rounded-2xl overflow-hidden bg-cover bg-[url("https://i.pinimg.com/control1/736x/58/0e/52/580e523634c0a721332fcc572cdd055d.jpg")]'>
            <h2 className='text-black font-bold text-xl p-1'>{elm.title}</h2>
            <p className='p-1 text-black overflow-auto scrollbar-none break-words flex-1'>{elm.content}</p>
            <button onClick={()=>{deleteNote(idx)}} className='bg-black text-white w-full rounded-full py-1 mt-1'>Delete Note</button>
          </div>
            )
          })}
        </div>
      </div>
    </div> 
  )
}

export default App