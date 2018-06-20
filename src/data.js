window.computeUsersStats = (users, progress, courses) => {
  var myList = [];
  users.forEach(function(element) {
  var uid = element.id;
  console.log(progress[uid]);
  
  });
  // console.log(myList);
  // myList.forEach(function(element) {
  // console.log(element);
  // let nameOfStudents = document.createElement('p');
  // nameOfStudents.innerText = element.name;
  // studentsOptions.appendChild(nameOfStudents);
  // });
  // return myList;
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
  //pintar en pantalla
  // console.log(myListOrderAndFiltered);
  // return myListOrderAndFiltered;
}
//- Para cada estudiante:
//  + Calcular porcentaje de completitud de todos los _cursos_.
//  + Calcular grado de completitud de _lecturas_, _ejercicios autocorregidos_,
//    y _quizzes_.
