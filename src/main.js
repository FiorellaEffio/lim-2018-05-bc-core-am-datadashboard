function changeSede() {
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    let selectCampus = document.getElementById('selectCampus');
    let sedeName = selectCampus.options[selectCampus.selectedIndex].value;
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

function beginApp() {
  fetch('https://api.laboratoria.la/cohorts')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    let selectCampus = document.getElementById('selectCampus');
    let sedeName = selectCampus.options[selectCampus.selectedIndex].value;
    let cohortByCampus = cohorts.filter(cohort => (cohort.id.toUpperCase()).indexOf(sedeName.toUpperCase()) !== -1);
    let selector = document.getElementById('cohortsOptions');
    let cohortName = cohortByCampus[selector.selectedIndex].id;
    let jsonFile = "https://api.laboratoria.la/cohorts/" + cohortName + "/users";
    fetch(jsonFile)
    .then((response) => {return response.json();})
    .then((users) => {
      jsonFile = "https://api.laboratoria.la/cohorts/"+ cohortName +"/progress";
      fetch(jsonFile)
      .then((response) => {return response.json();})
      .then((progress)=> {
        //ordenar por tema
        let orderTheme = document.getElementById('orderBy');
        let orderBy = orderTheme.options[orderTheme.selectedIndex].text;
        //ordenar por direccion
        let orderDirec = document.getElementById('orderDirection');
        let orderDirection = orderDirec.options[orderDirec.selectedIndex].text;
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
        let myFinalList = window.processCohortData(options);
        let studentsOptions = document.getElementById("studentsOptions");
        studentsOptions.innerHTML="";
        studentsOptions.innerHTML="<tr><td>Nombre</td><td>Porcentaje</td><td>Ejercicios</td><td>Quizzes</td><td>Lecturas</td><td>Prom Quiz</td></tr>";
        studentsOptions.appendChild(document.createElement('tr'));
        myFinalList.forEach(function(element) {
          let nameOfStudents = document.createElement('td');
          nameOfStudents.innerText = element.stats.name;
          let percentStudent = document.createElement('td');
          percentStudent.innerText = element.stats.percent + "%";
          let exercisesStudent = document.createElement('td');
          exercisesStudent.innerText = element.stats.exercises.completed + " de " +element.stats.exercises.total;
          let quizzesStudent = document.createElement('td');
          quizzesStudent.innerText = element.stats.quizzes.completed + " de " +element.stats.quizzes.total;
          let readsStudent = document.createElement('td');
          readsStudent.innerText = element.stats.reads.completed + " de " +element.stats.reads.total;
          let quizzesPromStudent = document.createElement('td');
          if(element.stats.quizzes.scoreAvg > 0){
            quizzesPromStudent.innerText = element.stats.quizzes.scoreAvg;
          } else {
            quizzesPromStudent.innerText = "0";
          }
          studentsOptions.innerHTML += "<tr>";
          studentsOptions.appendChild(nameOfStudents);
          studentsOptions.appendChild(percentStudent);
          studentsOptions.appendChild(exercisesStudent);
          studentsOptions.appendChild(quizzesStudent);
          studentsOptions.appendChild(readsStudent);
          studentsOptions.appendChild(quizzesPromStudent);
          studentsOptions.innerHTML += "</tr>";
        });
      });
    });
  });
}
changeSede();
document.getElementById('selectCampus').addEventListener("onchange", changeSede);
var chargeAll = document.getElementById('buttonCharge');
chargeAll.addEventListener("click", beginApp);
var chargeSearch = document.getElementById('buttonSearch');
chargeSearch.addEventListener("click", beginApp);
