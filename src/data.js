const cohortsLaboratoria = '../data/cohorts.json';
const cohortPrincipal = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfCohortPrincipal = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
var arrayStudents = [];
var arrayStudentsName = [];
fetch(cohortsLaboratoria).then((response)=>{
    if (response.status !== 200) {
        //Código cuando recibimos una respuesta corréctamente del servidor
        console.log("Error");
        // Solo si es que sabemos que la respuesta es JSON, o fallará
    } else{
        //Código en caso de que nos respondan con algún error
        return response.json();
    }
}).then((respuestaJson)=>{
    //Código que usa el JSON
    for (var i = 0; i < respuestaJson.length; i++) {
      arrayStudents[i] = respuestaJson[i];
    }
    beginHTML(arrayStudents);

}).catch((error)=>{
    /* Código en caso de que la llamada falle
     * Como cuando el usuario NO tiene internet, o se haya cortado la
     * comunicación.
     */
     console.log("No hay resultados :(");
});
function beginHTML(arrayStudents) {
  arrayStudents.forEach(function(element) {
  let nameOfCohort = document.createElement('option');
  // nameOfCohort.value = element.id;
  nameOfCohort.innerText = element.id;
  cohortsOptions.appendChild(nameOfCohort);
  });
}


fetch(cohortPrincipal).then((response)=>{
    if (response.status !== 200) {
        //Código cuando recibimos una respuesta corréctamente del servidor
        console.log("Error");
        // Solo si es que sabemos que la respuesta es JSON, o fallará
    } else{
        //Código en caso de que nos respondan con algún error
        return response.json();
    }
}).then((respuestaJson)=>{
    //Código que usa el JSON
    for (var i = 0; i < respuestaJson.length; i++) {
      arrayStudentsName[i] = respuestaJson[i];
    }
    beginStudentsCohort(arrayStudentsName);

}).catch((error)=>{
    /* Código en caso de que la llamada falle
     * Como cuando el usuario NO tiene internet, o se haya cortado la
     * comunicación.
     */
     console.log("No hay resultados :(");
});

function beginStudentsCohort(arrayStudentsName) {
  console.log(arrayStudentsName);
  arrayStudentsName.forEach(function(element) {
  console.log(element);
  let nameOfStudents = document.createElement('p');
  // nameOfCohort.value = element.id;
  nameOfStudents.innerText = element.name;
  studentsOptions.appendChild(nameOfStudents);
  });
}
