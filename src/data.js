window.computeUsersStats = (users, progress, courses) => {

  var myList = [];
  var usersWithStats = {
    stats : {
      percent: 0,//porcentaje total respecto a cursos totales del cohort
      exercises : {
        total: 0,//total de ejercicios autocorregidos
        completed: 0,//autocorregidos completados
        percent: 0//porcentaje de ejercicios autocorregidos autocompletados
      },
      reads : {
        total:0,//total de lecturas presentes
        completed: 0, //lecturas completadas
        percent: 0 //porcentaje de lecturas
      },
      quizzes : {
        total: 0, //total quizzes presentes
        completed: 0, // quizzes autocompletados
        percent: 0, //porcentaje de quizzes completados
        scoreSum: 0, //suma de puntuaciones de los _quizzes_ completados
        scoreAvg: 0 //promedio de puntuaciones en quizzes completados
      }
    }
  }
  return myList;
}

window.sortUsers = (users, orderBy, orderDirection) => {
  // La función `sortUsers()` se encarga de _ordenar_ la lista de usuarios creada con
  // `computeUsersStats()` en base a `orderBy` y `orderDirection`.
  // * `users`: Arreglo de objetos creado con `computeUsersStats()`.
  // * `orderBy`: String que indica el criterio de ordenado. Debe permitir ordenar
  //   por nombre, porcentaje de completitud total, porcentaje de ejercicios
  //   autocorregidos completados, porcentaje de quizzes completados, puntuación
  //   promedio en quizzes completados, y porcentaje de lecturas completadas.
  // * `orderDirection`: La dirección en la que queremos ordenar. Posibles valores:
  //   `ASC` y `DESC` (ascendiente y descendiente).
  return myListByOrder;//arreglo de usuarios ordenados

}

window.filterUsers = (users, search) => {
  // * `users`: Arreglo de objetos creado con `computeUsersStats()`.
  // * `search`: String de búsqueda.
  return myListFiltered;//lista de usuarios con coincidencia en search
}

window.processCohortData = (options) => {
  //tambien es invocada cuando cambia los criterios de ordenado y filtrado en la interfaz.
  fetch('../data/cohorts.json')
  .then((response) => {return response.json();})
  .then((cohorts) => {
    fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
    .then((response) => {return response.json();})
    .then((users) => {
      fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
      .then((response) => {return response.json();})
      .then((progress)=> {
        let selector = document.getElementById('cohortsOptions');
        let cohort = selector.options[selector.selectedIndex].text;
        let newUsers = [];
        // for (let i=0; i<=users.length; i++) {
        //   if(cohort === users[i].signupCohort ) {
        //     newUsers.push(users[i]);
        //
        //   } else {
        //     console.log(users[i].signupCohort);
        //   }
        // }
        // console.log(newUsers);
        var options = {
          cohort: cohorts[selector.selectedIndex],//objeto cohort de la lista de cohorts
          cohortData : {
            users,//array en bruto users
            progress//objeto en bruto progress
          },
          orderBy: '',//string del sortUsers
          orderDirection: '',//string del sortUsers
          search:''//string del filterUsers
        }
        console.log(options);
      });
            // courses: Arreglo de strings con los ids de los cursos del cohort en cuestión. Esta data se puede extraer de la propiedad coursesIndex de los objetos que representan los cohorts.
            // printingList(users, cohorts);
    });
  });
  // computeUsersStats();
  // sortUsers();
  // filterUsers();
  // var myListOrderAndFiltered = {
  //   stats: 0//ver computeUsersStats
  // }
  // return myListOrderAndFiltered;
}
//- Para cada estudiante:
//  + Calcular porcentaje de completitud de todos los _cursos_.
//  + Calcular grado de completitud de _lecturas_, _ejercicios autocorregidos_,
//    y _quizzes_.
