

var Auth = JSON.parse(localStorage.getItem('user')) || false

const header = document.querySelector('header');
header.innerHTML = `
               <nav class="navbar">
                    <div class="logo">Car Rental Agency</div>
                    <div class="menu">
                         <ul class="menu-list">
                              <li><a href='index.html'>Home</a></li>
                              ${Auth && Auth?.type === 'agency' && `<li><a href='new_car.html'>Add New Car</a></li>
                              <li><a href='booked.html'>Booked Cars</a></li>` || ''}
                              ${Auth && Auth?.email ?
          `<button class='btn bg-blue' onclick='logout()'>Logout</button>`
          :
          `<li><a href='agency_signup.html'>Agency Signup</a></li>
                                   <li><a href='customer_signup.html'>Customer Signup</a></li>
                                   <li><a href='login.html'>Login</a></li>`
     }
                         </ul>
                    </div>
               </nav>
`


const logout = () => {
     localStorage.removeItem('user');
     window.location.reload()
}