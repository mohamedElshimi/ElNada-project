// mohamed Elshimi
let data ;
let title = document.getElementById('title');
let price = document.getElementById('price');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
let mood = 'create';
let searchMood = 'title';
let up;


// Create Data
// Check if there is data before
if(localStorage.product != null)
{
    data =JSON.parse(localStorage.product);
}else{
    data = [];
}

submit.onclick = function (){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && newPro.count < 1000 && category.value != '') {
        if (mood == 'create') {
            if (newPro.count>1) {
                for (let i = 0; i < newPro.count; i++) {
                    data.push(newPro);
                    
                }
            }else{
                data.push(newPro);
            }
           
        } else {
            data[up]=newPro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';
        }
        Clear();
    }else{
        if (newPro.count > 1000) {
            alert('Products must be smaller than 1000')
        } else {
            alert('Enter all fildes')
        }
    }
    
    
    

    // Save localStorage
    localStorage.setItem('product',JSON.stringify(data));
    showData();
}

// Clear inputs
function Clear(){
    title.value='';
    price.value='';
    count.value='';
    category.value='';
}

// Show Data

function showData() {
    let table = '';
    
    for (let i = 0; i <  data.length; i++) {
       table +=`
       <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateProduct(${i})"  id="edit">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
       `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete = document.getElementById("delbtn");
    if (data.length > 0) {
        btndelete.innerHTML=`
        <button onclick="deleteAll()" >Delete All (${data.length})</button>
        `
    } else {
        btndelete.innerHTML="";        
    }
}
showData()

// Delete Product

function deleteProduct(i) {
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showData();
}

// Delete All Product
function deleteAll() {
    localStorage.clear();
    data.splice(0);
    showData();
}

// Update Product
function updateProduct(i) {
    title.value=data[i].title;
    price.value=data[i].price;
    category.value=data[i].category;
    submit.innerHTML='Update';
    count.style.display='none';
    up=i;
    mood='update'
    scroll({
        top:0,
        behavior:"smooth",
    })
}

function checkSearch(id) {
    if(id == 'searchtitle')
    {
       searchMood = 'title'; 
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value='';
    showData();
}

function searchProduct(value) {
    let table='';
    for (let i = 0; i < data.length; i++) {
        if (searchMood == 'title') {
                if (data[i].title.includes(value.toLowerCase())) {
                    table +=`<tr>
                                <td>${i+1}</td>
                                <td>${data[i].title}</td>
                                <td>${data[i].price}</td>
                                <td>${data[i].category}</td>
                                <td><button onclick="updateProduct(${i})"  id="edit">Update</button></td>
                                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                            </tr>
                    `
                }
        } else {
                if (data[i].category.includes(value.toLowerCase())) {
                    table +=`<tr>
                                <td>${i+1}</td>
                                <td>${data[i].title}</td>
                                <td>${data[i].price}</td>
                                <td>${data[i].category}</td>
                                <td><button onclick="updateProduct(${i})"  id="edit">Update</button></td>
                                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                            </tr>
                    `
                }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}