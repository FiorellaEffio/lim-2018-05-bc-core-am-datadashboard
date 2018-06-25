window.computeUsersStats = (users, progress, courses) => {
  let myList = [];
  users.forEach(function(element1) {
  console.log(element1);
  let uid = element1.id;
  let progressUser = progress[uid];
  let percentTotal = 0;
  let exercisesTotal = 0;
  let exercisesCompleted = 0;
  let exercisesPercent = 0;
  let readsTotal = 0;
  let readsCompleted = 0;
  let readsPercent = 0;
  let quizzesTotal = 0;
  let quizzesCompleted = 0;
  let quizzesPercent = 0;
  let quizzesScoreSum = 0;
  let quizzesScoreAvg = 0;
  let count = 0;
  count = 0;
  let empty = Object.keys(progressUser).length;
  if(empty !== 0)
  {
    courses.forEach(courseName => {
      if(progressUser.hasOwnProperty(courseName)) {
        if(progressUser[courseName].hasOwnProperty('percent')) {
          percentTotal += progressUser[courseName].percent;
          let progressUserByCourse = progressUser[courseName];
          console.log(Object.values(progressUserByCourse.units));
          Object.values(progressUserByCourse.units).forEach(unit => {
            let exercises = Object.values(unit.parts);
            console.log(exercises);
            exercises.forEach((parte) => {
              console.log(parte.type);
              if(parte.type === "read") {
                readsCompleted += parte.completed;
              }
              if(parte.type === "quiz") {
                quizzesCompleted += parte.completed;
              }
              if(parte.type === "practice") {
                exercisesCompleted += parte.completed;
              }
            })
          })
        }
      }
    })
    percentTotal = percentTotal/courses.length;
    console.log(percentTotal);
  }
  //Por ahora solo hay un curso
  let usersWithStats = {
    stats : {
      name : element1.name,
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
  return myList;
}

window.sortUsers = (users, orderBy, orderDirection) => {
  let myListByOrder =users;
  if(orderBy === "Nombre") {
    myListByOrder.sort( function(a, b) {
      var nameA=a.stats.name.toLowerCase(), nameB=b.stats.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
          return -1
      if (nameA > nameB)
          return 1
      return 0 //default return value (no sorting)
    });
  }
  if(orderBy === "Porcentaje Completitud Total") {
    myListByOrder.sort( function(a,b) {
      return a.stats.percent - b.stats.percent;
    });
  }
  if(orderBy === "Porcentaje ejercicios completos") {
    myListByOrder.sort( function(a,b) {
      return a.stats.percent - b.stats.percent;
    });
  }
  if(orderBy === "Porcentaje Quizzes completos") {
    myListByOrder.sort( function(a,b) {
      return a.stats.quizzes.total - b.stats.quizzes.total;
    });
  }
  if(orderBy === "Puntuacion promedio en quizzes") {
    myListByOrder.sort( function(a,b) {
      return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg;
    });
  }
  if(orderBy === "Porcentaje de lecturas completadas") {
    myListByOrder.sort( function(a,b) {
      return a.stats.reads.completed - b.stats.reads.completed;
    });
  }
  if (orderDirection === "DESC") {
    myListByOrder = myListByOrder.reverse();
  }
  document.getElementById("studentsOptions").innerHTML="";
  let count = 1;
  console.log("div"+count)
  myListByOrder.forEach(function(element) {
  let fileStudent = document.createElement('tr');
  fileStudent.setAttribute("id", "student" + count);
  let nameOfStudents = document.createElement('td');
  nameOfStudents.innerText = element.stats.name;
  let percentStudent = document.createElement('td');
  percentStudent.innerText = element.stats.percent;
  let exercisesStudent = document.createElement('td');
  exercisesStudent.innerText = element.stats.exercises.completed
  let quizzesStudent = document.createElement('td');
  quizzesStudent.innerText = element.stats.quizzes.completed;
  let readsStudent = document.createElement('td');
  readsStudent.innerText = element.stats.reads.completed;
  studentsOptions.appendChild(nameOfStudents);
  studentsOptions.appendChild(percentStudent);
  studentsOptions.appendChild(exercisesStudent);
  studentsOptions.appendChild(quizzesStudent);
  studentsOptions.appendChild(readsStudent);
  count++;
  studentsOptions.appendChild(document.createElement('tr'));
  });
  return myListByOrder;//arreglo de usuarios ordenados
}

window.filterUsers = (users, search) => {
  let myListFiltered = users.filter(user => (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
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
  let myListOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
  return myListOrderAndFiltered;
}
