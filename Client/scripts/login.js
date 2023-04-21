console.log("Login.js");

const agency_btn = document.querySelector('.agency-btn');
const customer_btn = document.querySelector('.customer-btn');

const agency_form = document.querySelector('#agency-form')
const customer_form = document.querySelector('#customer-form')

customer_btn.onclick = (event) => {
     if (agency_form.classList.contains('hide')) return

     agency_btn.classList.remove("bg-active")
     customer_btn.classList.add("bg-active")

     agency_form.classList.add("hide")
     customer_form.classList.remove("hide")
}

agency_btn.onclick = (event) => {
     if (customer_form.classList.contains('hide')) return

     customer_form.classList.add("hide")
     customer_btn.classList.remove("bg-active")
     agency_form.classList.remove("hide")
     agency_btn.classList.add("bg-active")
}

customer_form.onsubmit = (event) => {
     event.preventDefault();
     const email = customer_form.email.value
     const password = customer_form.password.value
     login({ email, password }, 'customer');
}


agency_form.onsubmit = (event) => {
     event.preventDefault();
     const email = agency_form.email.value
     const password = agency_form.password.value
     login({ email, password }, 'agency');
}


function login(data, type) {
     fetch('https://shy-ruby-monkey-shoe.cyclic.app/user/login', {
          method: 'POST',
          body: JSON.stringify({ ...data, type }),
          headers: {
               'Content-Type': "application/json"
          }
     })
          .then(res => res.json())
          .then(res => {
               if (res?.msg === 'success') {
                    localStorage.setItem('user', JSON.stringify(res.user));
                    window.location.href = 'index.html';
               } else {
                    alert(res?.msg)
               }
               console.log(res)
          })
          .catch(err => console.log(err))
}