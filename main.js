let price = document.getElementById( 'price' );
let Taxes = document.getElementById( 'Taxes' );
let Ads = document.getElementById( 'Ads' );
let Discount = document.getElementById( 'Discount' );
let btnTotal = document.getElementById( 'btn-total' );

let count = document.getElementById( 'count' );
let category = document.getElementById( 'category' );
let create = document.getElementById( 'create' );
let mood = 'Create';
let tmb;

// Get The Total 

function getTotal ()
{
  if ( price.value != '' )
  {
    btnTotal.innerHTML = ( ( +price.value + +Ads.value + +Taxes.value ) - ( +Discount.value ) );
    btnTotal.style.backgroundColor = '#195619';
  }
  else
  {
    btnTotal.innerHTML = 'Total:';
    btnTotal.style.backgroundColor = '#8d0a0a';
  }
}

// Create Project 
let dataProduct;
if ( localStorage.Product != null )
  dataProduct = JSON.parse( localStorage.Product );
else
  dataProduct = [];
create.onclick = function ()
{
  let newProduct = {
    tittle: tittle.value.toLowerCase(),
    price: price.value,
    Taxes: Taxes.value,
    Ads: Ads.value,
    Discount: Discount.value,
    count: count.value,
    btnTotal: btnTotal.innerHTML,
    category: category.value.toLowerCase(),
  };


  // the count of products

  if (
    newProduct.tittle != ''
    && newProduct.price != ''
    && newProduct.category != ''
    && newProduct.count <= 100
  )
  {
    if ( mood === 'Create' )
    {
      if ( newProduct.count > 1 )
      {
        for ( let i = 0; i < newProduct.count; i++ )
        {
          dataProduct.push( newProduct );
        }
      } else
      {
        dataProduct.push( newProduct );
      }
    }

    else
    {
      dataProduct[ tmb ] = newProduct;
      mood = 'Create';
      create.innerHTML = 'Create';
      count.style.display = 'block';
    }
    clearInputs();
  }


  // Save In Local Storage
  localStorage.setItem( 'Product', JSON.stringify( dataProduct ) );

  showData();
};

// Clear The Inputs 
function clearInputs ()
{
  tittle.value = '';
  price.value = '';
  Taxes.value = '';
  Ads.value = '';
  Discount.value = '';
  count.value = '';
  btnTotal.innerHTML = 'Total ';
  btnTotal.style.backgroundColor = '#8d0a0a';
  category.value = '';
}

// show Data 

function showData ()
{
  let table = '';
  for ( let i = 0; i < dataProduct.length; i++ )
  {

    table += `
      <tr>
      <td>${ i+1 }</td>
      <td>${ dataProduct[ i ].tittle }</td>
      <td>${ dataProduct[ i ].price }</td>
      <td>${ dataProduct[ i ].Taxes }</td>
      <td>${ dataProduct[ i ].Ads }</td>
      <td>${ dataProduct[ i ].Discount }</td>
      <td>${ dataProduct[ i ].btnTotal }</td>
      <td>${ dataProduct[ i ].category }</td>
      <td>
        <button onclick="update(${ i })">
        update
      </button>
      </td>
    <td> 
    <button onclick="deleteProduct (${ i })">
      delete
    </button>
    </td>
    </tr>
    `;
  }
  document.getElementById( 'tbody' ).innerHTML = table;
  if ( dataProduct.length > 0 )
  {
    let deleteAll = document.getElementById( 'deleteAll' );
    deleteAll.innerHTML = `<button id="DeleteAll"> Delete All (${ dataProduct.length } Product) </button>`;
  }
  else { deleteAll.innerHTML = ''; }
}
showData();

// Delete Product
function deleteProduct ( i )
{
  dataProduct.splice( i, 1 );
  localStorage.Product = JSON.stringify( dataProduct );
  showData();
}

// Delete All
deleteAll.onclick = function ()
{
  dataProduct = [];
  localStorage.clear();
  showData();
};

// update 

function update ( i )
{
  create.innerHTML = 'Update';
  tmb = i;
  tittle.value = dataProduct[ i ].tittle;
  price.value = dataProduct[ i ].price;
  Taxes.value = dataProduct[ i ].Taxes;
  Ads.value = dataProduct[ i ].Ads;
  Discount.value = dataProduct[ i ].Discount;
  count.value = dataProduct[ i ].count;
  category.value = dataProduct[ i ].category;

  count.style.display = 'none';
  mood = 'Update';

  scroll(
    {
      top: 0,
      behavior: "smooth",
    }
  );

  showData();
  getTotal();
}

// Search 

let search = document.getElementById( 'search' );
let searchMood = 'SearchByTittle';

function getSearchMood ( id )
{
  search.focus();
  search.value = '';
  showData();
  if ( id === 'serTittle' )
  {
    searchMood = 'SearchByTittle';
    search.placeholder = 'Search By Tittle';
  }
  else
  {
    search.placeholder = 'Search By Category';
    searchMood = 'SearchByCategory';
  }
}

function searchData ( value )
{
  let table = '';
  if ( searchMood === 'SearchByTittle' )
  {
    for ( let i = 0; i < dataProduct.length; i++ )
    {
      if ( dataProduct[ i ].tittle.includes( value.toLowerCase() ) )
      {

        table += `
        <tr>
        <td>${ i }</td>
        <td>${ dataProduct[ i ].tittle }</td>
        <td>${ dataProduct[ i ].price }</td>
        <td>${ dataProduct[ i ].Taxes }</td>
        <td>${ dataProduct[ i ].Ads }</td>
        <td>${ dataProduct[ i ].Discount }</td>
        <td>${ dataProduct[ i ].btnTotal }</td>
        <td>${ dataProduct[ i ].category }</td>
        <td>
          <button onclick="update(${ i })">
          update
        </button>
        </td>
      <td> 
      <button onclick="deleteProduct (${ i })">
        delete
      </button>
      </td>
      </tr>
      `;

      }
    }
  }
  else
  {
    for ( let i = 0; i < dataProduct.length; i++ )
    {
      if ( dataProduct[ i ].category.includes( value.toLowerCase() ) )
      {

        table += `
        <tr>
        <td>${ i }</td>
        <td>${ dataProduct[ i ].tittle }</td>
        <td>${ dataProduct[ i ].price }</td>
        <td>${ dataProduct[ i ].Taxes }</td>
        <td>${ dataProduct[ i ].Ads }</td>
        <td>${ dataProduct[ i ].Discount }</td>
        <td>${ dataProduct[ i ].btnTotal }</td>
        <td>${ dataProduct[ i ].category }</td>
        <td>
          <button onclick="update(${ i })">
          update
        </button>
        </td>
      <td> 
      <button onclick="deleteProduct (${ i })">
        delete
      </button>
      </td>
      </tr>
      `;

      }
    }
  }




  document.getElementById( 'tbody' ).innerHTML = table;
}
