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
  nameOfStudents.innerText = element.stats.name + " " + element.stats.percent;
  studentsOptions.appendChild(nameOfStudents);
  });
  return myList;
}

window.sortUsers = (users, orderBy, orderDirection) => {
  var myListByOrder = [];
  if(orderBy === "Porcentaje Completitud Total") {
  let emptyUsers = users;//al ultimo queda un array vacio
  let k = 0;
  let result;
    for(var i = 0;i<users.length; i++) {
      for(var j = 0 ; j < emptyUsers.length-1; j++) {
        k = j+1;
        console.log(users);
        if(users[j].stats.percent>=users[k].stats.percent) {
          result = j;
        } else {
          result = k;
        }
      }
      myListByOrder.push(emptyUsers[result]);
      console.log(myListByOrder);
      emptyUsers.splice(result,1);
      console.log(emptyUsers);
    }
  }
  console.log(myListByOrder);
  // if(orderBy === "") {}
  // if(orderBy === "") {}
  // if(orderBy === "") {}

  if (orderDirection === "ASC") {
    myListByOrder = myListByOrder.reverse();
  }
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
  let usersFiltered = filterUsers(users, search);
  console.log(usersFiltered);
  let usersFilAndSort = sortUsers(usersFiltered, orderBy, orderDirection);
  myListOrderAndFiltered = computeUsersStats(usersFilAndSort, progress, courses);
  return myListOrderAndFiltered;
}
