//document.getElementById('form').addEventListener('submit',saveTask)
let form=document.getElementById('form')
form.addEventListener('submit',(e)=>{
    saveTask()
    e.preventDefault()
    form.reset()
})

function saveTask(){
    let title=document.getElementById('title').value
    let description=document.getElementById('descripcion').value
   
    let DatoImg=img.src
     const task={
        title,
        description,
        img:DatoImg
    }
    let tasks=[]
   
   if(title==='' || description==='')
   {
       alert('Campos Vacios Verifique!')
   }else{
    if(localStorage.getItem('tasks') ===null)
    {
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    }else{
        let tasks= JSON.parse(localStorage.getItem('tasks'))
        tasks.push(task)
       localStorage.setItem('tasks',JSON.stringify(tasks)) 
    } 
   }
    getTasks()
}

function getTasks(){
   let tasks= JSON.parse(localStorage.getItem('tasks'))
   let listView= document.querySelector('.contenido')
    let total=document.querySelector('.total')
   listView.innerHTML=''

    if(JSON.parse(localStorage.getItem('tasks')===null))
    {
        alert('no hay datos para mostrar')
    }else{
        for(let i=0;i<tasks.length;i++)
    {
     let title=tasks[i].title
     let description=tasks[i].description
     let img=tasks[i].img
     listView.innerHTML+=`
     <div class="alert alert-primary col-sm-12 d-flex justify-content-between" role="alert">
     <span>${title}</span>
     <span>${description}</span>
     <img src="${img}"></img>
     <a class="btndelete btn btn-danger" onclick="deleteTasks('${title}')">Delete</a>
    </div>
     `
    }
    }
}

getTasks()

function deleteTasks(title){
  let tasks=JSON.parse(localStorage.getItem('tasks'))

  for(let i=0;i<tasks.length;i++)
  {
      if(tasks[i].title===title){
          tasks.splice(i,1)
      }
  }
  localStorage.setItem('tasks',JSON.stringify(tasks))
  getTasks()
}

let file=document.getElementById('file')
let img=document.querySelector('img')

   file.addEventListener('change',(e)=>{
    const file=e.target.files[0]
    const fileReader=new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.addEventListener('load',(e)=>{
    img.setAttribute('src',e.target.result)
    console.log(img.src)
    })
   })