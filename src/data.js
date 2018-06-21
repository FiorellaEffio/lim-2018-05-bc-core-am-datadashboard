window.computeUsersStats = (users, progress, courses) => {
  var myList = [];
  users.forEach(function(element) {
  var uid = element.id;
  console.log(uid);
  var progressUser = progress[uid];
  console.log(progressUser);
  var percentTotal = 0;
  var exercisesTotal = 0;
  var exercisesCompleted = 0;
  var exercisesPercent = 0;
  var readsTotal = 0;
  var readsCompleted = 0;
  var readsPercent = 0;
  var quizzesTotal = 0;
  var quizzesCompleted = 0;
  var quizzesPercent = 0;
  var quizzesScoreSum = 0;
  var quizzesScoreAvg = 0;
  courses.forEach(function(element) {
    percentTotal += progressUser[element].percent;
    console.log(percentTotal);
  })
  //Por ahora solo hay un curso
  var usersWithStats = {
    stats : {
      name : element.name,
      percent: percentTotal,//porcentaje total respecto a cursos totales del cohort
      exercises : {
        total: exercisesTotal,//total de ejercicios autocorregidos
        completed: exercisesCompleted,//autocorregidos completados
        percent: exercisesPercent//porcentaje de ejercicios autocorregidos autocompletados
      },
      reads : {
        total: readsTotal,//total de lecturas presentes
        completed: readsCompleted, //lecturas completadas
        percent: readsPercent //porcentaje de lecturas
      },
      quizzes : {
        total: quizzesTotal, //total quizzes presentes
        completed: quizzesCompleted, // quizzes autocompletados
        percent: quizzesPercent, //porcentaje de quizzes completados
        scoreSum: quizzesScoreSum, //suma de puntuaciones de los _quizzes_ completados
        scoreAvg: quizzesScoreAvg //promedio de puntuaciones en quizzes completados
      }
    }
  }
  myList.push(usersWithStats);
  });
  console.log(myList);
  document.getElementById("studentsOptions").innerHTML="";
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
  let usersWithStatus = computeUsersStats(usersFiltered, progress, courses);
  console.log(usersWithStatus);
  // let myListOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
  // myListOrderAndFiltered;
  // return myListOrderAndFiltered;
}
