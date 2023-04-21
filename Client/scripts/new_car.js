console.log("new car.js");

const user = JSON.parse(localStorage.getItem("user")) || false;
console.log('user: ', user);

if (!user) {
     window.location.href = 'login.html'
}


const add_car_form = document.getElementById('add-car-form');

add_car_form.addEventListener('submit', async (event) => {
     event.preventDefault();
     const obj = {};
     const allInput = document.querySelectorAll('#add-car-form input');
     allInput.forEach((input) => {
          if (input.type === 'number') {
               obj[input.name] = input.valueAsNumber;
          } else {
               obj[input.name] = input.value;
          }
     })

     obj["agency"] = user?._id;
     obj["agencyID"] = user?._id;

     await addNewCar(obj)
     add_car_form.reset();
})


async function addNewCar(car) {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/cars/new`, {
               method: 'POST',
               body: JSON.stringify(car),
               headers: {
                    'Content-Type': "application/json"
               }
          })
          const data = await res.json()
          await getAgencyCars();
          console.log('data: ', data);
     } catch (error) {
          console.log('error: ', error);
     }
}


async function getAgencyCars() {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/cars/?agencyID=${user?._id}`)
          const data = await res.json();
          console.log('data: ', data);
          if (data?.msg === 'success') {
               appendCars(data.cars)
          } else {
               alert(data?.msg);
          }
     } catch (error) {
          console.log('error: ', error);

     }
}


getAgencyCars();


function appendCars(data) {
     const container = document.querySelector('.cars-table tbody');
     container.innerHTML = null
     data.forEach((car, index) => {
          const template = `
                              <tr>
                                   <td>${index + 1}</td>
                                   <td>${car.vehicle_model}</td>
                                   <td>${car.vehicle_number}</td>
                                   <td>${car.seats}</td>
                                   <td>₹${car.rent}/day</td>
                                   <td>
                                        <button class="btn full bg-blue" onclick='append_modal(${JSON.stringify(car)})'>Edit</button>
                                   </td>
                                   <td>
                                        <button class="btn full red br-red" onclick='deleteCar("${car._id}")'>Delete</button>
                                   </td>
                              </tr>
          `

          container.innerHTML += template
     })
}
const modal_container = document.querySelector('.modal-portal');
function append_modal(car) {
     console.log('car: ', car);
     const template = `
                    <div class="modal-wrapper">
                         <div class="modal-overlay" onclick='closeModal()'></div>
                         <article class="modal">
                              <header>
                                   <div class="modal-heading">Update Car Details</div>
                                   <button class="close center" onclick='closeModal()'>&#10006;</button>
                              </header>

                              <div class="modal-body">
                                   <form class="form" id="update-car-form">
                                        <input type="text" name="vehicle_model" placeholder="Vehicle Model" value=${car.vehicle_model}>
                                        <input type="text" name="vehicle_number" placeholder="Vehicle Number" value=${JSON.stringify(car.vehicle_number)}>
                                        <input type="number" name="seats" placeholder="Seat Capacity" value=${car.seats}>
                                        <input type="number" name="rent" placeholder="Rent per day" value=${car.rent}>
                                        <button type="submit" class="btn full">Add New Car</button>
                                   </form>
                              </div>
                         </article>
                    </div>
     `
     modal_container.innerHTML = template

     const update_car_form = document.getElementById('update-car-form');
     update_car_form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const obj = {};
          const allInput = document.querySelectorAll('#update-car-form input');
          allInput.forEach((input) => {
               if (input.type === 'number') {
                    obj[input.name] = input.valueAsNumber;
               } else {
                    obj[input.name] = input.value;
               }
          })
          await updateCar(car._id, obj)
          closeModal();
          update_car_form.reset();
     })
}

function closeModal() {
     modal_container.innerHTML = null
}

async function updateCar(id, car) {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/cars/${id}/update`, {
               method: 'PATCH',
               body: JSON.stringify(car),
               headers: {
                    'Content-Type': "application/json"
               }
          })
          const data = await res.json()
          await getAgencyCars();
     } catch (error) {
          console.log('error: ', error);
     }
}

async function deleteCar(id) {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/cars/${id}/delete`, {
               method: 'DELETE',
               headers: {
                    'Content-Type': "application/json"
               }
          })
          const data = await res.json()
          await getAgencyCars();
     } catch (error) {
          console.log('error: ', error);
     }
}
