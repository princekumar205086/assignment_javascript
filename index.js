// accessing button
let enrollBtn = document.getElementById('enroll');
// accessing from through id
let enrollForm = document.getElementById('forms');
// deceleraing array for storing data || or balnk array
let enrollData = JSON.parse(sessionStorage.getItem('enrollData')) || [];
// data conatiner
let tdata = "";


// Load enrollment data from session storage on page load
window.addEventListener('load', () => {
    const data = JSON.parse(sessionStorage.getItem('enrollData'));
    if (data) {
      generateTableRows(data);
      const tbody = document.getElementById('table-data');
      tbody.innerHTML = tdata;
    }
  });

// adding event function on button click
enrollBtn.addEventListener('click', (e) => {
    // for not refreshing the page 
  e.preventDefault()
//   accessing input value from id or classname
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let website = document.getElementById('website').value;
  let image = document.getElementById('image').value;
  let gender = document.getElementsByClassName('gender');
  let genderchoice = "";
  let skill = document.getElementsByClassName('skills');
  let skillchoice = "";

  // getting gender value
  for(let i=0; i<gender.length; i++){
    if(gender[i] && gender[i].checked===true){
      genderchoice += gender[i].value + " ";
    }
  }
  // getting skills value
  for (let i = 0; i < skill.length; i++) {
    if (skill[i] && skill[i].checked === true) {
      skillchoice += skill[i].value + " ";
    }
  }
 
  // checking simple validation
  if(name=="" || email=="" || skillchoice==""){
    let errorMsg = "All fields are required";
    // setting error msg
    document.getElementById('error').innerHTML = errorMsg;
    return false;
  } else {
     // setting error msg blank on successful validation
    let errorMsg = "";
    document.getElementById('error').innerHTML = errorMsg;
    // add enrollment data to array by destructuring
    const enrollment = { name, email, website, image, gender: genderchoice, skills: skillchoice };
    enrollData.push(enrollment);

    // store enrollData in session storage
    sessionStorage.setItem('enrollData', JSON.stringify(enrollData));
    // reset the form
    enrollForm.reset();
  }
  
  // get data from session storage
  let data = JSON.parse(sessionStorage.getItem('enrollData'));
  generateTableRows(data);
  const tbody = document.getElementById('table-data');
  tbody.innerHTML = tdata;
});

// Function to generate HTML for table rows based on enrollment data
function generateTableRows(data) {
  if (data) {
    tdata = data.map((item, index) => {
        // generating table row
      return (index % 2 == 0) ? `<tr class="row bg-white fade-in" key=${index}>
      <td class="col-9">
          <p><b>${item.name}</b></p>
          <p>${item.gender}</p>
          <p>${item.email}</p>
          <p><a href=${item.website}>${item.website}</a></p>
          <p>${item.skills}</p>
      </td>
      <td class="col-3 text-center"><img src=${item.image} height="90" width="90" alt=""></td>
      </tr>`: `<tr class="row bg-lightyellow fade-in" key=${index}>
          <td class="col-9">
          <p><b>${item.name}</b></p>
          <p>${item.gender}</p>
          <p>${item.email}</p>
          <p><a href=${item.website}>${item.website}</a></p>
          <p>${item.skills}</p>
          </td>
          <td class="col-3 text-center"><img src=${item.image} height="90" width="90" alt=""></td>
      </tr>`;
    }).join("");
  }
  return tdata;
}

