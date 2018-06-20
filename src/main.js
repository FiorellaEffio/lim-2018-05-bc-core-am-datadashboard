//Mostrar los cohorts en lista para que el usuario seleccione
fetch('../data/cohorts.json')
.then((response) => {return response.json();})
.then((cohorts) => {
  cohorts.forEach(function(element) {
  let nameOfCohort = document.createElement('option');
  nameOfCohort.innerText = element.id;
  cohortsOptions.appendChild(nameOfCohort);
  })
});
//Evento para el boton una vez que el usuario seleccione cohort
var chargeAll = document.getElementById('buttonCharge');
chargeAll.addEventListener("click", processCohortData);
