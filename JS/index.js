var cerrar = false;
const getProductos = async () => {
     var res = await fetch('./Mock/data.json')
     res = await res.json()
     res = await res.data
     return (console.log(res), vistaProductos(res), localStorage.setItem("imagenes", JSON.stringify(res)))
}



getProductos()



const vistaProductos = (res) => {
     res.forEach(r => {

          document.querySelector("#tarjetas").innerHTML += `
        <div class="tarjeta">
        <img class="img" src=${r.img} alt="articulo"></img>
        <span>${r.art}</span>
        <span>COD: ${r.id}</span>
        <span class="precio">ARS $${r.precio}</span>
        <button id=${r.id} onclick="agregarCarro(id)" class="btn-card">Añadir al carro</button>
        </div>
        `

     });
}

var cambio = false;
const carroVisible = () => {

     !cambio ? (document.querySelector("#carro").classList.add("carro-visible"), cambio = true) : (document.querySelector("#carro").classList.remove("carro-visible"), cambio = false)
}

var cambio2 = false;
const iconUp = () => {
     !cambio2 ? (document.querySelector("#icon").classList.add("img-carrito-up"), cambio2 = true) : (document.querySelector("#icon").classList.remove("img-carrito-up"), cambio2 = false)
}
/* setInterval(() => {
     iconUp()
}, 4000); */






var carro = []

const agregarCarro = (id) => {

     cerrar = true
     var id = parseInt(id)
     console.log(id)
     Swal.fire({
          text: 'Agregar al carrito?',
          width: '300px',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí, Agregar',
          denyButtonText: `No Agregar`,
          showCancelButton: false,
          //showConfirmButton: false,
     }).then((result) => {
          if (result.isConfirmed) {

               var imagenes = localStorage.getItem("imagenes")
               imagenes = JSON.parse(imagenes)
               var re = imagenes.find(r => r.id === id)
               var cant = 1;

               var resp = carro.find(r => r.id === id)
               if (carro.length !== 0 && resp) {

                    console.log(resp)
                    if (resp) {
                         resp.cantidad++
                         re = imagenes.find(r => r.id === id)
                         resp.monto = re.precio;
                         (resp.monto = resp.monto * resp.cantidad)
                         console.log(carro)

                    } else if (resp) {
                         var objetoCarro = {
                              id: re.id,
                              imagen: re.img,
                              desc: re.art,
                              monto: re.precio,
                              cantidad: cant
                         }
                         carro.push(objetoCarro)
                         console.log(carro)
                    }

                    setTimeout(() => {
                         window.location.href = "#header"
                    }, 500)
               } else {
                    var objetoCarro = {
                         id: re.id,
                         imagen: re.img,
                         desc: re.art,
                         monto: re.precio,
                         cantidad: cant
                    }
                    carro.push(objetoCarro)
                    console.log(carro)
                    setTimeout(() => {
                         window.location.href = "#header"
                    }, 500)
               }
               return (console.log(carro), vistaCarro(carro), localStorage.setItem("carro", JSON.stringify(carro)));
          } else if (result.isDenied) {
               Swal.fire({
                    text: 'Cancelado',
                    width: '200px',
                    timer: 3000,
                    showCancelButton: false,
                    showConfirmButton: false,
               })

          }

     })


}
const agregarCarroItem = (id) => {

     cerrar = true
     var id = parseInt(id)
     console.log(id)
 
          

               var imagenes = localStorage.getItem("imagenes")
               imagenes = JSON.parse(imagenes)
               var re = imagenes.find(r => r.id === id)
               var cant = 1;

               var resp = carro.find(r => r.id === id)
               if (carro.length !== 0 && resp) {

                    console.log(resp)
                    if (resp) {
                         resp.cantidad++
                         re = imagenes.find(r => r.id === id)
                         resp.monto = re.precio;
                         (resp.monto = resp.monto * resp.cantidad)
                         console.log(carro)

                    } else if (resp) {
                         var objetoCarro = {
                              id: re.id,
                              imagen: re.img,
                              desc: re.art,
                              monto: re.precio,
                              cantidad: cant
                         }
                         carro.push(objetoCarro)
                         console.log(carro)
                    }

                    setTimeout(() => {
                         window.location.href = "#header"
                    }, 500)
               } else {
                    var objetoCarro = {
                         id: re.id,
                         imagen: re.img,
                         desc: re.art,
                         monto: re.precio,
                         cantidad: cant
                    }
                    carro.push(objetoCarro)
                    console.log(carro)
                    setTimeout(() => {
                         window.location.href = "#header"
                    }, 500)
               }
               return (console.log(carro), vistaCarro(carro), localStorage.setItem("carro", JSON.stringify(carro)));
         
    


}



const vistaCarro = (carro) => {

     if (carro.length !== 0) {
          var total = 0;
          carro.length===3?document.querySelector("#carro").classList.add("carro-height"):null
          document.querySelector("#carro").innerHTML = ""
          document.querySelector("#carro").innerHTML = "<span class='title-carro'>Carro de Compras</span>"

          //document.querySelector("#carro").innerHTML=`<button onclick="vaciarCarro()">Clear carro</button><span id="total"></span>`
          carro.forEach(c => (


               document.querySelector("#carro").innerHTML += `<div id="items-carro">
            
        <img style="width:50%;height:80px" src=${c.imagen}></img> 
        <div class="card-content"> 
        
        <span class="id">COD: ${c.id}</span>
        <span class="desc">${c.desc}</span>
        
        <span class="monto">SubTotal: <strong>$${c.monto}</strong></span>
        </div>
       <div class="box-btn-item-carro"><span class="cant"> Cant: ${c.cantidad}</span>   <span style="width:40px !important"><button class="btn-add" onclick="agregarCarroItem(id)" id=${c.id}>+</button></span>
        <span style="width:40px !important"><button class="btn-rest" onclick="restarCarro(id)" id=${c.id}>-</button></span>
        </div>
        </div>
        `

          ))

          for (let i = 0; i < carro.length; i++) {
               total = total + carro[i].monto
               localStorage.setItem("total", JSON.stringify(total))

          }
          document.querySelector("#total").innerHTML = ""
          document.querySelector("#total").innerHTML = `<div>Total: $${total}</div>`
     } else {
          document.querySelector("#carro").innerHTML = ""
          document.querySelector("#carro").classList.remove("carro-height")
        
     }
}



const vaciarCarro = () => {


     if (cerrar === true) {
          carro = localStorage.getItem("carro")
          carro = JSON.parse(carro)
          Swal.fire({
               text: 'Vaciar carro?',
               showDenyButton: true,
               showCancelButton: true,
               confirmButtonText: 'Sí, vaciar',
               denyButtonText: `No vaciar`,
               showCancelButton: false,
               width: '300px'
               //showConfirmButton: false,
          }).then((result) => {
               if (result.isConfirmed) {
                    document.querySelector("#carro").innerHTML = ""
                    document.querySelector("#carro").innerText = "Sin Articulos"
                    total = 0
                    document.querySelector("#total").innerHTML = ""
                    document.querySelector("#total").innerText = `Total: $${total}`
                    //document.querySelector("#table").classList.remove("table-2-on")
                    localStorage.removeItem("carro")
                    localStorage.removeItem("total")
                    carro.length = 0

                    Swal.fire({
                         text: 'CARRO VACIO',
                         timer: 3000,
                         width: '200px',
                         showCancelButton: false,
                         showConfirmButton: false,

                    })
                    document.querySelector("#carro").classList.remove("carro-height")
                    document.querySelector("#carro").innerText = "Sin Articulos"
                    cerrar = false
               } else if (result.isDenied) {
                    Swal.fire({
                         text: 'CARRO SUCCESS',
                         timer: 3000,
                         width: '200px',
                         showCancelButton: false,
                         showConfirmButton: false,

                    })
               }
          })
     } else if (cerrar === false) {
          Swal.fire({
               text: 'EL CARRO YA ESTÁ VACIO',
               timer: 3000,
               width: '200px',
               showCancelButton: false,
               showConfirmButton: false,

          })

          document.querySelector("#carro").innerHTML = ""
          document.querySelector("#carro").innerText = "Sin Articulos"
          //getData()
     }

     //document.querySelector("#carro").innerText="Sin Articulos"
}


const restarCarro = (id) => {
     console.log(id)
     id = parseInt(id)
     let imagenes = localStorage.getItem("imagenes")
     imagenes = JSON.parse(imagenes)
     carro = localStorage.getItem("carro")
     carro = JSON.parse(carro)

     var m = imagenes.find(m1 => m1.id === id)

     var e = carro.find(c => c.id === id)

     let index = carro.indexOf(e)
     console.log(index)
     console.log(e)
     e.cantidad = e.cantidad - 1
     let objetoCarro = {
          id: m.id,
          desc: m.art,
          imagen: m.img,
          cantidad: e.cantidad,
          monto: e.monto - m.precio
     }

     carro = carro.filter(c => c.id != id)


     carro.splice(index, 0, objetoCarro)
     localStorage.setItem("carro", JSON.stringify(carro))
     carro = localStorage.getItem("carro")
     carro = JSON.parse(carro)
     vistaCarro(carro)



     for (let i = 0; i < carro.length; i++) {

          if (carro[i].cantidad === 0) {
               carro = carro.filter(ca => ca.cantidad !== 0)
               if (carro.length !== 0) {

                    console.log(carro)


                    localStorage.setItem("carro", JSON.stringify(carro))
                    carro = localStorage.getItem("carro")
                    carro = JSON.parse(carro)
                    carro.length<3?document.querySelector("#carro").classList.remove("carro-height"):null
                    vistaCarro(carro)
               } else if (carro.length === 0) {
                    //vaciarCarro()
                    limpiar()
               }

          }
     }


     



}

const limpiar = () => {
     document.querySelector("#carro").innerHTML = ""
     total = 0
     document.querySelector("#total").innerHTML = ""
     document.querySelector("#total").innerText = `Total: $${total}`
     //document.querySelector("#table").classList.remove("table-2-on")
     localStorage.removeItem("carro")
     localStorage.removeItem("total")
     carro.length = 0
     Swal.fire({
          text: 'CARRO VACIO',
          timer: 3000,
          width: '200px',
          showCancelButton: false,
          showConfirmButton: false,

     })
     document.querySelector("#carro").innerText = "Sin Articulos"
     cerrar = false
}

//EJEMPLO Stackoverflow filtrar el que no queremos y filter genera
// un nuevo array con los elementos existentes menos el filtrado en el caso de no necesitarlo

/* const resultado = animales.filter(animal => animal != 'oso');
console.log(resultado); */