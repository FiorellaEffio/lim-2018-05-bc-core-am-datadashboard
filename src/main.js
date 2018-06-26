//Mostrar los cohorts en lista para que el usuario seleccione
changeSede();
document.getElementById('seleccionaSede').addEventListener("onchange", changeSede);
function changeSede() {
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    let selectorSede = document.getElementById('seleccionaSede');
    let sedeName = selectorSede.options[selectorSede.selectedIndex].value;
    let cohortByCampus = cohorts.filter(cohort => (cohort.id.toUpperCase()).indexOf(sedeName.toUpperCase()) !== -1);
    document.getElementById("cohortsOptions").innerHTML = "";
    cohortByCampus.forEach(function(element) {
    let nameOfCohort = document.createElement('option');
    nameOfCohort.innerText = element.id;
    let cohortsOptions = document.getElementById('cohortsOptions');
    cohortsOptions.appendChild(nameOfCohort);
    })
  });
}
//Evento para el boton una vez que el usuario seleccione cohort
var chargeAll = document.getElementById('buttonCharge');
chargeAll.addEventListener("click", beginApp);
var chargeSearch = document.getElementById('buttonSearch');
chargeSearch.addEventListener("click", beginApp);
//funcion para convertir propiedades del objeto en array
// object.hasOwnProperty to know if exists the property
function beginApp() {
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    //selector
    let selectorSede = document.getElementById('seleccionaSede');
    let sedeName = selectorSede.options[selectorSede.selectedIndex].value;
    let cohortByCampus = cohorts.filter(cohort => (cohort.id.toUpperCase()).indexOf(sedeName.toUpperCase()) !== -1);
    let selector = document.getElementById('cohortsOptions');
    let cohortName = cohortByCampus[selector.selectedIndex].id;
    // console.log(cohortName);
    let jsonFile = "https://api.laboratoria.la/cohorts/" + cohortName + "/users";
    fetch(jsonFile)
    .then((response) => {return response.json();})
    .then((users) => {
      jsonFile = "https://api.laboratoria.la/cohorts/"+ cohortName +"/progress";
      fetch(jsonFile)
      .then((response) => {return response.json();})
      .then((progress)=> {
        //ordenar por tema
        let ordenar1 = document.getElementById('orderBy');
        let orderBy = ordenar1.options[ordenar1.selectedIndex].text;
        //ordenar por direccion
        let ordenar2 = document.getElementById('orderDirection');
        let orderDirection = ordenar2.options[ordenar2.selectedIndex].text;
        //buscador
        let search = document.getElementById('searchText').value;
        var options = {
          cohort: cohortByCampus[selector.selectedIndex],
          cohortData : {
            users,//array en bruto users
            progress,//objeto en bruto progress
            coursesIndex : Object.keys(cohortByCampus[selector.selectedIndex].coursesIndex)//arreglo
          },
          orderBy,
          orderDirection,
          search
        }
        // console.log(cohortByCampus[selector.selectedIndex].coursesIndex);
        window.processCohortData(options);
      });
    });
  });
}

function validator(a,b) {
  if(parseInt(b)===0) {
    return 0;
  } else {
    return parseInt(a/b);
  }
}
