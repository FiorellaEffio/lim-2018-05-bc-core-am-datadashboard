window.computeUsersStats = (users, progress, courses) => {
  var myList = [];
  users.forEach(function(element) {
  var uid = element.id;
  var progressUser = progress[uid];
  //Por ahora solo hay un curso
  var usersWithStats = {
    stats : {
      name : element.name,
      percent: progressUser.intro.percent,//porcentaje total respecto a cursos totales del cohort
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
  myList.push(usersWithStats);
  });
  console.log(myList);
  myList.forEach(function(element) {
  let nameOfStudents = document.createElement('p');
  nameOfStudents.innerText = element.stats.name;
  studentsOptions.appendChild(nameOfStudents);
  });
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
  myListOrderAndFiltered = computeUsersStats(usersFiltered, progress, courses);
  return myListOrderAndFiltered;
}
