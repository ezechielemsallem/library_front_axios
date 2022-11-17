const MYSERVER = 'https://flask-return-json.onrender.com/books'
        let res = [] // all book
        let myCart = []
        const loadData = async () => {
            res = await fetch(MYSERVER + '/all_books/')
                .then((response) => response.json())
            display.innerHTML = res.map((book, i) => `
            <div class="col">
            <div class="card h-100">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.name}</h5>
          <p class="card-text">${book.author}</p>
          <p class="card-text">${book.year} </p>
          <p class="card-text">${book.type}</p>
          <button class='btn btn-danger' onclick="delData(${book.id})">DEL</button>
        </div>
        <div class="card-footer">
            <button class='btn btn-success' onclick="buy(${i},1)">+</button>
            <button class='btn btn-danger' onclick="buy(${i},-1)">-</button>
        </div>
      </div>
    </div>`).join("")
            myCart = JSON.parse(localStorage.getItem("loans"))
            if (myCart == null)myCart=[]
            // console.table(myCart)
        }
        

        const delData = async (id) => {
           res1 = await fetch(`${MYSERVER}/del_book/${id}` , {
  method: 'DELETE',
});
loadData()
        }









const buy = (i, amount_2_add = 1) => {
    console.clear()
    let exist_in_cart = false
    let found_index = -1
    //check if already in my cart 
    myCart.forEach((item,index,ar)  => {
        if (item.id === res[i].id){
            exist_in_cart= true 
            found_index = index
        }
    });



    if (exist_in_cart) { //exist
        if (myCart[found_index].amount + amount_2_add === 0 ){
            myCart = myCart.filter(item => item.id != res[i].id )
        }else {
        myCart[found_index].amount += amount_2_add
    }
        
    }else { // NOT EXIST
        if (amount_2_add < 0)
            return
        let temp = res[i]
        temp.amount = amount_2_add // add proprety amount
        myCart.push(temp)
    }
  
    
    // savce my cart to locat storage 
    localStorage.setItem("loans", JSON.stringify(myCart))
    console.table(myCart)
}
