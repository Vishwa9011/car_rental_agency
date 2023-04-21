console.log("booked.js")
var Auth = false;

function getAuth() {
     Auth = JSON.parse(localStorage.getItem('user')) || false;
}

getAuth();

async function getAgencyCars() {
     try {
          const res = await fetch(`https://shy-ruby-monkey-shoe.cyclic.app/booked/?agencyID=${Auth?._id}`)
          const data = await res.json();
          if (data?.msg === 'success') {
               console.log('data.cars: ', data.bookedCars);
               appendCars(data.bookedCars)
          } else {
               alert(data?.msg);
          }
     } catch (error) {
          console.log('error: ', error);

     }
}

getAgencyCars()


function appendCars(data) {
     const container = document.querySelector('.cars-table tbody');
     container.innerHTML = null
     data.forEach((item, index) => {
          const template = `
                              <tr>
                                   <td>${index + 1}</td>
                                   <td>${item.user?.name}</td>
                                   <td>${item.car?.vehicle_model}</td>
                                   <td>${item.car?.vehicle_number}</td>
                                   <td>${item.no_of_days}</td>
                                   <td>${item.start_date}</td>
                              </tr>
          `

          container.innerHTML += template
     })
}