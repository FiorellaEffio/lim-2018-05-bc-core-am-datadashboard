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
  return myListByOrder;//arreglo de usuarios ordenados
}

window.filterUsers = (users, search) => {
  var myListFiltered = [];
  users.forEach(function(element) {
    if((element.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1) {
      myListFiltered.push(element);
    }
  });
  return myListFiltered;//lista de usuarios con coincidencia en search
}

window.processCohortData = (options) => {
  let users = options.cohortData.users;
  let cohort = options.cohort;
  let progress = options.cohortData.progress;
  let orderBy = options.orderBy;
  let orderDirection = options.orderDirection;
  let search = options.search;
  let courses = options.cohortData.coursesIndex;
  // for (let i=0; i<=users.length; i++) {
  //    if(cohort.id === users[i].signupCohort ) {
  //      users.push(users[i]);
  //    } else {
  //      console.log(users[i].signupCohort);
  //    }
  // }
  let usersFiltered = filterUsers(users, search);
  console.log(usersFiltered);
  // usersFilAndSort = sortUsers(usersFiltered, orderBy, orderDirection);
  // myListOrderAndFiltered = computeUsersStats(usersFilAndSort, progress, courses);
  // //pintar en pantalla
  // console.log(myListOrderAndFiltered);
  // return myListOrderAndFiltered;
}
//- Para cada estudiante:
//  + Calcular porcentaje de completitud de todos los _cursos_.
//  + Calcular grado de completitud de _lecturas_, _ejercicios autocorregidos_,
//    y _quizzes_.
