const addBtn =document.getElementById('addButton')
const demo = document.getElementById('demo')
const username = document.getElementById('username')
const password = document.getElementById('password')
const amt1=document.getElementById('amt1')
const cat=document.getElementById('cat')
//const id = document.getElementById('obj')
addBtn.addEventListener('click', async function(){
    console.log('user detais')
    demo.innerHTML='Added successfully'
    const respobj = await fetch('/post-data',{
        method : 'POST',
        body : JSON.stringify({
            'username' : 'lakshmi',
            'password' : '091123',
             'category' : 'laptop',
             'amount' : '100000',
        }),
        headers:{
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    const postData = await respobj.json()
    console.log(postData)
})