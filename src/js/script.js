function createProductCard(product) {

    let item = document.createElement('li')
    item.classList.add('product-card')   

    let img = document.createElement('img')
    item.appendChild(img)
    img.classList.add('product-card-img')
    img.alt = product.nome
    img.src = product.img

    let title = document.createElement('p')
    item.appendChild(title)
    title.classList.add('product-card-title')
    title.innerText = product.nome

    let category = document.createElement('p')
    item.appendChild(category)
    category.classList.add('product-card-category')
    category.innerText = product.categoria

    let description = document.createElement('p')
    item.appendChild(description)
    description.classList.add('product-card-description')
    description.innerText = `Nutrientes: ${product.componentes.join(', ')}`

    let price = document.createElement('p')
    item.appendChild(price)
    price.classList.add('product-card-price')
    price.innerText = `R$ ${product.preco.toFixed(2)}`

    let button = document.createElement('button')
    item.appendChild(button)
    button.classList.add('product-card-button')
    button.innerText = 'Adicionar ao Carrinho'
    button.setAttribute('onclick', `addToCart(${product.id})`)

    return item

}

function createAllProductsSection(database) {

    let productsList = document.querySelector('.products-cards-list')
    productsList.innerHTML = ''

    for (let i = 0; i < database.length; i++) {

        let product = database[i]

        let productCard = createProductCard(product)

        productsList.appendChild(productCard)

    }

}

function createHortifrutiSection(database) {

    let productsList = document.querySelector('.products-cards-list')
    productsList.innerHTML = ''

    for (let i = 0; i < database.length; i++) {

        if (database[i].categoria === 'Hortifruti') {

            let product = database[i]

            let productCard = createProductCard(product)
    
            productsList.appendChild(productCard)

        }

    }

}

function createBakerySection(database) {

    let productsList = document.querySelector('.products-cards-list')
    productsList.innerHTML = ''

    for (let i = 0; i < database.length; i++) {

        if (database[i].categoria === 'Panificadora') {

            let product = database[i]

            let productCard = createProductCard(product)
    
            productsList.appendChild(productCard)

        }

    }

}

function createDairySection(database) {

    let productsList = document.querySelector('.products-cards-list')
    productsList.innerHTML = ''

    for (let i = 0; i < database.length; i++) {

        if (database[i].categoria === 'Laticínios') {

            let product = database[i]

            let productCard = createProductCard(product)
    
            productsList.appendChild(productCard)

        }

    }

}

let allProductsSection = document.querySelector('#all-products')

allProductsSection.addEventListener('click', function(e) {

    e.preventDefault()

    createAllProductsSection(produtos)

    sumAllProductsPrice(produtos)
   
}) 

let hortifrutiSection = document.querySelector('#hortifruti')

hortifrutiSection.addEventListener('click', function(e) {

    e.preventDefault()

    createHortifrutiSection(produtos)

    sumHortifrutiProductsPrice(produtos)         

})

let bakerySection = document.querySelector('#bakery')

bakerySection.addEventListener('click', function(e) {

    e.preventDefault()

    createBakerySection(produtos)

    sumBakeryProductsPrice(produtos)
 
})

let dairySection = document.querySelector('#dairy')

dairySection.addEventListener('click', function(e) {

    e.preventDefault()

    createDairySection(produtos)

    sumDairyProductsPrice(produtos)
 
})

function searchProduct(database) {

    let productsList = document.querySelector('.products-cards-list')
    productsList.innerHTML = ''
    
    let typedText = document.querySelector('.product-searching').value.toLowerCase()

    let sum = 0
      
    for (let i = 0; i < database.length; i++) {
       
        if (database[i].nome.toLowerCase() === typedText || database[i].categoria.toLowerCase() === typedText) {
            
            let product = database[i]

            let productCard = createProductCard(product)
    
            productsList.appendChild(productCard)

            sum += database[i].preco 

        }       

    }

    renderTotalPrice(sum)
}

let searchingButton = document.querySelector('.product-searching-button')

searchingButton.addEventListener('click', function(e){
  
    e.preventDefault()

    searchProduct(produtos) 
    
})

let searchingInput = document.querySelector('.product-searching')

searchingInput.addEventListener('click', function(e) {

    e.preventDefault()

    createAllProductsSection(produtos)

    sumAllProductsPrice(produtos)

})

let cart = []

function addToCart(id) {

    if(cart.some((item) => {

        return item.id === id

    })) {

        changeNumberOfUnits('plus', id) 

    } else {

        let item = produtos.find((product) => {

            return product.id === id

        })
         
        cart.push({
            ...item,
            numberOfUnits: 1,
        })
    }

    updateCart()

}

function updateCart() {    
   
    if(cart.length === 0) {

        createEmptyCart()          

    } else {

        createCartList(cart)

        createTotalArea(cart)   

    }

}

function createCartCard(product) {

    let item = document.createElement('li')
    item.classList.add('product-cart-card')

    let imgDiv = document.createElement('div')
    item.appendChild(imgDiv)
    imgDiv.classList.add('product-cart-cart-img-div')

    let img = document.createElement('img')
    imgDiv.appendChild(img)
    img.classList.add('product-cart-card-img')
    img.alt = product.nome
    img.src = product.img

    let div = document.createElement('div')
    item.appendChild(div)
    div.classList.add('product-cart-card-div')

    let title = document.createElement('p')
    div.appendChild(title)
    title.classList.add('product-cart-card-title')
    title.innerText = product.nome

    let category = document.createElement('p')
    div.appendChild(category)
    category.classList.add('product-cart-card-category')
    category.innerText = product.categoria

    let price = document.createElement('p')
    div.appendChild(price)
    price.classList.add('product-cart-card-price')
    price.innerText = `R$ ${product.preco.toFixed(2)}`

    let buttonsDiv = document.createElement('div')
    item.appendChild(buttonsDiv)
    buttonsDiv.classList.add('product-cart-card-buttons')

    let trash = document.createElement('img')
    buttonsDiv.appendChild(trash)
    trash.classList.add('product-cart-card-trash')
    trash.alt = 'Lixeira'
    trash.src = './src/img/trash-vector.svg'
    trash.setAttribute('onclick', `removeItemFromCart(${product.id})`)

    let unitsDiv = document.createElement('div')
    buttonsDiv.appendChild(unitsDiv)
    unitsDiv.classList.add('product-cart-card-units-div')

    let minusButton = document.createElement('button')
    unitsDiv.appendChild(minusButton)
    minusButton.classList.add('product-cart-card-minus-button')
    minusButton.innerText = '-'
    minusButton.setAttribute('onclick', `changeNumberOfUnits('minus', ${product.id})`)

    let units = document.createElement('p')
    unitsDiv.appendChild(units)
    units.classList.add('product-cart-card-units')
    units.innerText = product.numberOfUnits

    let plusButton = document.createElement('button')
    unitsDiv.appendChild(plusButton)
    plusButton.classList.add('product-cart-card-plus-button')
    plusButton.innerText = '+'
    plusButton.setAttribute('onclick', `changeNumberOfUnits('plus', ${product.id})`)

    return item
    
}

function createCartList(array) {

    let purchaseList = document.querySelector('.purchase-cart-list')
    purchaseList.innerHTML = ''

    cart.forEach((item) => {

        let product = createCartCard(item)

        purchaseList.appendChild(product)

    })

}

function changeNumberOfUnits(action, id) {

    cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits

        if(item.id === id) {

            if(action === 'minus' && numberOfUnits > 1) {

                numberOfUnits--

            } else {

                if(action === 'plus') {

                    numberOfUnits++

                }
            }
        }

        return {
            ...item,
            numberOfUnits
        }
    })

    updateCart()
}

function createTotalArea(array) {

    let totalAreaDiv = document.querySelector('.total-area')
    totalAreaDiv.innerHTML = ''

    let quantityDiv = document.createElement('div')
    totalAreaDiv.appendChild(quantityDiv)
    quantityDiv.classList.add('total-quantity-div')

    let quantityDescription = document.createElement('p')
    quantityDiv.appendChild(quantityDescription)
    quantityDescription.classList.add('total-quantity-description')
    quantityDescription.innerText = 'Quantidade'

    let quantity = document.createElement('p')
    quantityDiv.appendChild(quantity)
    quantity.classList.add('total-quantity')
    quantity.innerText = renderQuantity(array)

    let priceDiv = document.createElement('div')
    totalAreaDiv.appendChild(priceDiv)
    priceDiv.classList.add('total-price-div')    

    let priceDescription = document.createElement('p')
    priceDiv.appendChild(priceDescription)
    priceDescription.classList.add('total-price-description')
    priceDescription.innerText = 'Total'

    let price = document.createElement('p')
    priceDiv.appendChild(price)
    price.classList.add('total-price')
    price.innerText = `R$ ${renderPrice(array).toFixed(2)}`

}

function renderQuantity(array) {

    let quantity = 0

    cart.forEach((item) => {

        quantity += item.numberOfUnits

    })

    return quantity
}

function renderPrice(array) {

    let price = 0

    cart.forEach((item) => {

        price += item.preco * item.numberOfUnits
    })

    return price

}

function createEmptyCart() {
    
    let list = document.querySelector('.purchase-cart-list')
    list.innerHTML = ''

    let total = document.querySelector('.total-area')
    total.innerHTML = ''

    let item = document.createElement('li')
    list.appendChild(item)
    item.classList.add('empty-cart')

    let img = document.createElement('img')
    item.appendChild(img)
    img.classList.add('empty-cart-img')
    img.alt = 'Carrinho Vazio'
    img.src = './src/img/empty-cart-vector-1.jpg'

    let description = document.createElement('p')
    item.appendChild(description)
    description.classList.add('empty-cart-description')
    description.innerText = 'Por enquanto não temos produtos no carrinho'
   
}

function removeItemFromCart(id) {

    cart = cart.filter((item) => {
        return item.id !== id
    })

    updateCart()

}

createAllProductsSection(produtos)

createEmptyCart()

