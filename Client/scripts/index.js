console.log('index.js');
var Auth = false;

function getAuth() {
     Auth = JSON.parse(localStorage.getItem('user')) || false;
}

getAuth();

async function getUser() {

     if (!Auth && !Auth?._id) {
          console.log("user mising")
          return
     }

     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/user/${Auth._id}/get`);
          const data = await res.json()
          if (data && data.msg == 'success') {
               console.log('user: ', data.user.rented_cars);
               localStorage.setItem('user', JSON.stringify(data.user || false));
               getAuth()
          }
     } catch (error) {
          console.log('error: ', error);
     }
}

async function getAvailabelCars() {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/cars/`)
          const data = await res.json();
          console.log('data: ', data);
          if (data?.msg === 'success') {
               appendAvailableCars(data.cars)
          } else {
               alert(data?.msg);
          }
     } catch (error) {
          console.log('error: ', error);

     }
}

getUser()
     .then(() => getAvailabelCars())

function appendAvailableCars(data) {
     const container = document.querySelector('.card-container')
     container.innerHTML = null;

     data.forEach(car => {
          const template = `
               <article class="car-card">
                         <div class="car-image">
                              <img src="https://cars.tatamotors.com/images/punch/punch-suv-home-mob.png" alt="">
                         </div>
                         <div class="card-body">
                              <p class="bold">
                                   <span>Model</span>
                                   <span class='cap'>${car.vehicle_model}</span>
                              </p>
                              <p class="bold">
                                   <span>Number </span>
                                   <span>${car.vehicle_number}</span>
                              </p>
                              <p class="bold">
                                   <span>Seat Capacity </span>
                                   <span class="red bold">${car.seats}</span>
                              </p>
                              <p class="bold">
                                   <span>Rent/day</span>
                                   <span class="green bold">₹${car.rent}/-</span>
                              </p>
                              <p class="bold">
                                   <span>Agency Name</span>
                                   <span class="red bold cap">${car.agency?.name}</span>
                              </p>
                              <div class="car-input-group ${checkBooked(car._id) && 'hide' || ''} ${(Auth && Auth?.type === 'agency' && 'hide') || ''}">
                                   <label for="" class="bold">
                                        Choose days
                                        <select name="no_of_days" class="no-of-days">
                                             <option value="" selected>Choose days</option>
                                             <option value="1">1</option>
                                             <option value="2">2</option>
                                             <option value="3">3</option>
                                             <option value="4">4</option>
                                             <option value="5">5</option>
                                             <option value="6">6</option>
                                             <option value="7">7</option>
                                             <option value="8">8</option>
                                             <option value="9">9</option>
                                             <option value="10">10</option>
                                        </select>
                                   </label>
                                   <label for="" class="bold">
                                        Start Date
                                        <input type="date" name="start_date" min="04/19/2023">
                                   </label>
                              </div>
                              <button  class="btn full active bg-red ${Auth && Auth?.type === 'agency' && 'disabled'} ${checkBooked(car._id) && 'booked' || ''}" onclick='bookNow(event, "${car._id}", "${car.agencyID}")'>${checkBooked(car._id) && 'Booked' || 'Book Now'}</button>
                         </div>
                    </article >
               `
          container.innerHTML += template
     });

}


function bookNow(event, id, agencyID) {

     if (!Auth && !Auth?.email) {
          window.location.href = 'login.html';
          return;
     }

     if (Auth && Auth?.type === 'agency') return;

     const inputFields = event.target.previousElementSibling.children;

     const obj = {};
     obj['car'] = id;
     obj['carID'] = id;
     obj['user'] = Auth._id;
     obj['userID'] = Auth._id;
     obj['agencyID'] = agencyID;

     for (let key in inputFields) {
          if (inputFields[key]?.tagName === 'LABEL') {
               let input = inputFields[key]?.children[0];
               obj[input.name] = input.value;
          }
     }

     if (!obj['no_of_days']) {
          return alert("Please Choose the Number of Days")
     }

     if (validateDate(obj['start_date'])) {
          return alert("Past Date not allow");
     }

     bookCar(obj)
}


function validateDate(value) {
     const date = new Date(value);
     const now = new Date();
     if (now.getDate() <= date.getDate() && now.getMonth() <= date.getMonth() && now.getFullYear() <= date.getFullYear()) {
          return false
     }
     return true
}

function checkBooked(id) {
     return Auth && Auth?.rented_cars?.includes(id)
}


async function bookCar(bookingDetail) {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/booked`, {
               method: 'POST',
               body: JSON.stringify(bookingDetail),
               headers: {
                    'Content-Type': "application/json"
               }
          })
          const data = await res.json();
          await getUser();
          await getAvailabelCars();
     } catch (error) {
          console.log('error: ', error);
     }
}

