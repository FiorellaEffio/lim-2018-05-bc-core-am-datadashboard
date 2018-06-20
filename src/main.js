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
chargeAll.addEventListener("click", beginApp);
//funcion para convertir propiedades del objeto en array
// object.hasOwnProperty to know if exists the property
function beginApp() {
  fetch('../data/cohorts.json')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then((response) => {return response.json();})
    .then((users) => {
      fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
      .then((response) => {return response.json();})
      .then((progress)=> {
        //selector
        let selector = document.getElementById('cohortsOptions');
        let cohortName = selector.options[selector.selectedIndex].text;
        //ordenar por tema
        let ordenar1 = document.getElementById('orderBy');
        let orderBy = ordenar1.options[ordenar1.selectedIndex].text;
        //ordenar por direccion
        let ordenar2 = document.getElementById('orderDirection');
        let orderDirection = ordenar2.options[ordenar2.selectedIndex].text;
        //buscador
        let search = document.getElementById('searchText').value;
        var options = {
          cohort: cohorts[selector.selectedIndex],
          cohortData : {
            users,//array en bruto users
            progress,//objeto en bruto progress
            coursesIndex : Object.keys(cohorts[selector.selectedIndex].coursesIndex)//arreglo
          },
          orderBy,
          orderDirection,
          search
        }
        console.log(options);
        processCohortData(options);
      });
    });
  });
}
