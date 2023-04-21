console.log('signup.js');

//* creating a unique ID;
const getID = () => crypto.randomUUID();


// * constructor function for creating a user;
function CreateUser(name, email, password, type) {
     this.id = getID();
     this.name = name;
     this.type = type;
     this.email = email;
     this.password = password;
}

const agency_signup_form = document.querySelector('#agency')
const customer_signup_form = document.querySelector('#customer')

if (customer_signup_form != null) {
     customer_signup_form.addEventListener('submit', function (event) {
          event.preventDefault();

          const formData = new FormData(customer_signup_form);

          const name = formData.get('name');
          const email = formData.get('email');
          const password = formData.get('password');
          const confirm_password = formData.get('confirm_password');

          if (confirm_password !== password) {
               return alert("Password not matched")
          }

          const user = new CreateUser(name, email, password, 'customer')
          registeration(user)
     })
}

if (agency_signup_form != null) {
     agency_signup_form.addEventListener('submit', function (event) {
          event.preventDefault();

          const formData = new FormData(agency_signup_form);
          const name = formData.get('name');
          const email = formData.get('email');
          const password = formData.get('password');
          const confirm_password = formData.get('confirm_password');

          if (confirm_password !== password) {
               return alert("Password not matched")
          }

          const user = new CreateUser(name, email, password, 'agency')

          registeration(user);

     })
}



function registeration(data) {
     fetch(`https://shy-ruby-monkey-shoe.cyclic.app/user/register`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
               'Content-Type': "application/json"
          }
     })
          .then(res => res.json())
          .then(res => {
               if (res && res?.msg === 'success') {
                    window.location.href = 'login.html';
               } else {
                    alert(res?.msg)
               }
               console.log(res)
          })
          .catch(err => console.log(err))
}