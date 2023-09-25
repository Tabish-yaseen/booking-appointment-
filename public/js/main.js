let ul=document.querySelector('#lists')

let Name=document.querySelector('.name')
let Phoneno=document.querySelector('.phoneno')
let Email=document.querySelector('.email')
let userid=null
let editmode=false


function userDetails(e){
    e.preventDefault()
    
    let details={
        name:Name.value,
        phoneno:Phoneno.value,
        email:Email.value
    }
    if(editmode===false)
    axios.post('http://localhost:3000/user/add-user',details).then((res)=>{
        showOnScreen(res.data)
        document.querySelector('#form').reset();
    }).catch(err=>{
        console.log(err)
    })


    else if(editmode && userid){
        axios.put(`http://localhost:3000/user/update-user/${userid}`,details)
        .then((res)=>{
            return axios.get(`http://localhost:3000/user/get-userbyId/${userid}`)
        })
          .then((user)=>{
            showOnScreen(user.data)
            document.querySelector('#form').reset();
             userid=null
             editmode=false
        })        

    }
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/user/get-users').then((res)=>{
        // console.log(res)
        res.data.forEach((user) => {
            showOnScreen(user)
            
        });
    })

})   
 function showOnScreen(user){
    let li=document.createElement('li')
    li.innerHTML=`
    ${user.name} ${user.email} ${user.phoneno}
    <button class="delete" id="${user.id}">delete</buuton>
    <button  class="edit"  name="${user.name}" phoneno="${user.phoneno}"  email="${user.email}" id="${user.id}">Edit</button>
    `
    ul.appendChild(li)
}
ul.addEventListener('click',(e)=>{
    //for delete
    if (e.target.classList.contains('delete')){
        let li=e.target.parentElement
        let id=e.target.getAttribute('id')
        console.log(id)
        axios.delete(`http://localhost:3000/user/delete-user/${id}`).then((res)=>{
        }).then((res)=>{
            ul.removeChild(li)
        }).catch(err=>{
            console.log(err)
        })
    }
    // for edit
    else if(e.target.classList.contains('edit')){
        let li =e.target.parentElement
        console.log(li.textContent.split('')[0])
      Name.value= e.target.getAttribute('name')
      Email.value=e.target.getAttribute('email')
      Phoneno.value=e.target.getAttribute('phoneno')
      userid=e.target.getAttribute('id')
      editmode=true
      ul.removeChild(li)
     }

})

 