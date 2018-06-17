const cohortsLaboratoria = '../data/cohorts.json';
const cohortPrincipal = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfCohortPrincipal = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
var arrayStudents = [];
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
    console.log(respuestaJson);
    for (var i = 0; i < respuestaJson.length; i++) {
      arrayStudents[i] = respuestaJson[i];
    }
    console.log(arrayStudents);
    beginHTML(arrayStudents);

}).catch((error)=>{
    /* Código en caso de que la llamada falle
     * Como cuando el usuario NO tiene internet, o se haya cortado la
     * comunicación.
     */
     console.log("No hay resultados :(");
});
function beginHTML(arrayStudents) {
  console.log(arrayStudents);
  arrayStudents.forEach(function(element) {
  console.log(element);
  let nameOfCohort = document.createElement('option');
  nameOfCohort.value = element.id;
  nameOfCohort.innerText = element.id;
  cohortsOptions.appendChild(nameOfCohort);
  });
  // for (var i = 0; i < arrayStudents.length; i++) {
  //   console.log(arrayStudents[i].id);
  //   (document.getElementById('cohortsOptions')).appendChild("<option>" + arrayStudents[i].id + "</option>");
  // }
}
