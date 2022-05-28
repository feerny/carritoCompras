//constantes
const buy = document.getElementById("buy");
const cancel = document.getElementById("cancel");
const CONTENEDOR = document.getElementById('container-cards');
const selectProd = document.getElementById('select-products');
const crear = document.getElementById('btn-create');
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal');
const newProduct = document.getElementById('new-product');
const newPrice = document.getElementById('new-price');
const newImage = document.getElementById('new-image');
let btnNewProduct = document.getElementById('btn-new-create');
const filterXPrice = document.getElementById('filterXPrice');

let imgSelected = " ";
let idProduct = 0
let idpri = 10;
    
//asigno valores
window.addEventListener('load', listSelect);
selectProd.addEventListener('change', renderCards);
crear.addEventListener('click', ()=> modal.style.display = 'flex');
btnNewProduct.addEventListener('click', createNewProduct);
newImage.addEventListener('change',importImg);
closeModal.addEventListener('click',()=>{modal.style.display = 'none';
      newProduct.value='';
      newPrice.value=''; 
      newImage.value= '';    
    });
filterXPrice.addEventListener('change', filtro);
newProduct.addEventListener('keyup',validacionProd);
newPrice.addEventListener('keyup',validacionProd);
newImage.addEventListener('change',validacionProd);



//validacion de datos en inputs
function validacionProd(){
  if (newProduct.value!='' && newPrice.value!='' && newImage.value!='') {
    btnNewProduct.removeAttribute("disabled");
    btnNewProduct.setAttribute('class',"button-add-new");
  }
}


//funciones
function filtro(event) {
  const filtrar = event.target.value === 'Menores a 10USD'
  ? games.filter( game => game.price < 10)
  : event.target.value === 'Entre 10USD y 40USD'
  ? games.filter( game => game.price >= 10 && game.price <= 40)
  : event.target.value === 'Mayores a 40USD'
  ? games.filter( game => game.price > 40)
  : null;

  CONTENEDOR.innerHTML = '';
  filtrar.map( game => createCards(game));
}


//al comprar todas las targets se eliminan y el price vuelve a 0
buy.addEventListener('click',()=>{
  if (contador.innerHTML!="0") {
   alert('compra realizada por: '+contador.innerHTML+'USD');

   contador.textContent="0";

   CONTENEDOR.innerHTML='';
  }else{
    alert("nos se han agregado productos al carrito!!")
  }
 

 });


function importImg(event) {
  const currentImg = event.target.files[0];
  const objectURL = URL.createObjectURL(currentImg);
  imgSelected = objectURL;   
}

function createNewProduct() {
  idProduct++;
  idpri++;
  const titleProduct = newProduct.value;
  const priceProduct = newPrice.value;
  const id = idProduct;
  const idPR= idpri;

  const newgame = {idPrice:idPR,id:id,product: titleProduct,price: priceProduct,image: imgSelected};

  games.push(newgame);
  listSelect();
  modal.style.display = 'none';
  
  document.getElementById("new-product").value='';
  document.getElementById("new-price").value=''; 
  document.getElementById("new-image").value= null;
  
}

function renderCards() {
  games.map( game => { game.product === selectProd.value ? createCards(game) : null } );
}

function listSelect() {
  selectProd.innerHTML = '';  
  const anyOption = document.createElement('option');
  selectProd.appendChild(anyOption);
  anyOption.textContent = 'Select a product';
  games.map( game => {
    const option = document.createElement('option');
    option.value = game.product;
    option.textContent = game.product;
    selectProd.appendChild(option);
  });
}

function createCards(game) {
  const contador = document.getElementById("contador");
  //constantes
  const {idPrice, product, image, id, price } = game;
  const imgCard = document.createElement('img');
  const carta = document.createElement('div');
  const delet = document.createElement('button');
  const nameCard = document.createElement('p');
  const priceCard = document.createElement('p');
  const btnAdd = document.createElement('button');
  const cantProd = document.createElement('input');
  const btndeleted= document.createElement('button');
  const span = document.createElement('span');


  //dar valores
  btndeleted.setAttribute('id',id);
  btndeleted.classList.add('btn-add');
  btndeleted.classList.add('off');
  btndeleted.textContent = "remove";
  span.textContent="cantidad";
  span.classList.add("span");
  cantProd.setAttribute('type',"number");
  cantProd.setAttribute('class',"cant");
  cantProd.setAttribute('value',1);
  delet.textContent="X";
  delet.classList.add('deleted');
  delet.setAttribute('id',id);
  carta.classList.add('card-product');
  imgCard.setAttribute('src',image);
  imgCard.setAttribute('alt',`${id}-${product}`);
  imgCard.classList.add('img-product');
  nameCard.textContent = product;
  nameCard.classList.add('name-product');
  priceCard.classList.add('price-product');
  priceCard.setAttribute('id',idPrice);
  priceCard.textContent = price;
  btnAdd.setAttribute('id',id);
  btnAdd.classList.add('btn-add');
  btnAdd.textContent = "Add to Cart";


  carta.appendChild(delet);
  carta.appendChild(imgCard);
  carta.appendChild(nameCard);
  carta.appendChild(span);
  carta.appendChild(cantProd);
  carta.appendChild(priceCard);
  carta.appendChild(btnAdd);
  carta.appendChild(btndeleted);

  CONTENEDOR.appendChild(carta);


  cantProd.addEventListener('change',()=>{

    const valor= price*cantProd.value;

    document.getElementById(idPrice).textContent=valor;

  });


  //agrega precio al total a pagar y se desactiva el boton de cerrar de la target para no causar errores
  btnAdd.addEventListener('click',()=>{

    delet.setAttribute('disabled',true);
      const precio = contador.innerHTML;

      const suma = parseInt(precio);

      const priceCards = parseInt(document.getElementById(idPrice).innerHTML);


        
      const preciopagar=priceCards+suma;

      contador.textContent=preciopagar;

      btndeleted.classList.add('on');

      btnAdd.setAttribute('disabled',true);
      cantProd.setAttribute('disabled',true);


  });



  
    //al eliminar producto se descuenta del precio a pagar y se activa el boton de close de la target
  btndeleted.addEventListener('click',()=>{

    delet.removeAttribute('disabled');
    btndeleted.classList.remove('on');
    const precio2 = contador.innerHTML;

    const suma2 = parseInt(precio2);
    
    const priceCards2 = parseInt(document.getElementById(idPrice).innerHTML);
      
    const preciopagar=suma2-priceCards2;

    contador.textContent=preciopagar;
    btnAdd.removeAttribute('disabled');
    cantProd.removeAttribute('disabled');

    
});



  delet.addEventListener('click',borra);

  function borra(){
    carta.remove();
  }

  //al cancelar la compra todo vuelve a la normalidad pero no se eliminan las target
  cancel.addEventListener('click',()=>{
    contador.textContent="0";
    delet.removeAttribute('disabled');
    cantProd.removeAttribute('disabled');
    btndeleted.classList.remove('on');
    btnAdd.removeAttribute('disabled');
  });

}

