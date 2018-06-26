const filterUsers = (users, search) => {
  let myListFiltered = users.filter(user => (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);
  return myListFiltered;//lista de usuarios con coincidencia en search
}

const computeUsersStats = (users, progress, courses) => {
  let myList = [];
  users.forEach(function(element1) {
  // console.log(element1);
  let uid = element1.id;
  let progressUser = progress[uid];
  let percentTotal = 0;
  let exercisesTotal = 0;
  let exercisesCompleted = 0;
  let readsTotal = 0;
  let readsCompleted = 0;
  let quizzesTotal = 0;
  let quizzesCompleted = 0;
  let quizzesScoreSum = 0;
  let empty = Object.keys(progressUser).length;
  if(empty !== 0)
  {
    courses.forEach(courseName => {
      if(progressUser.hasOwnProperty(courseName)) {
        if(progressUser[courseName].hasOwnProperty('percent')) {
          percentTotal += progressUser[courseName].percent;
          let progressUserByCourse = progressUser[courseName];
          // console.log(Object.values(progressUserByCourse.units));
          Object.values(progressUserByCourse.units).forEach(unit => {
            let exercises = Object.values(unit.parts);
            // console.log(exercises);
            exercises.forEach((part) => {
              // console.log(part.type);
              if(part.type === "read") {
                readsCompleted += part.completed;
                readsTotal++;
              }
              if(part.type === "quiz") {
                quizzesCompleted += part.completed;
                quizzesTotal++;
                if(part.hasOwnProperty('score')){
                  quizzesScoreSum += part.score;
                }
              }
              if(part.type === "practice") {
                if(part.hasOwnProperty('exercises')) {
                  Object.values(part.exercises).forEach(ejercicio => {
                      exercisesCompleted += ejercicio.completed;
                      exercisesTotal++;
                  })
                }
              }
            })
          })
        }
      }
    })
    // console.log(percentTotal);
    percentTotal = Math.round((percentTotal/courses.length)*100)/100;
    // console.log(percentTotal);
  }
  //Por ahora solo hay un curso
  let usersWithStats = {
    stats : {
      name : element1.name,
      percent: percentTotal,
      exercises : {
        total: exercisesTotal,//total de ejercicios autocorregidos
        completed: exercisesCompleted,//autocorregidos completados
        percent: parseInt((validator(exercisesCompleted,exercisesTotal)*100).toFixed())//validator(exercisesCompleted,exercisesTotal)porcentaje de ejercicios autocorregidos autocompletados
      },
      reads : {
        total: readsTotal,//total de lecturas presentes
        completed: readsCompleted, //lecturas completadas
        percent: parseInt((validator(readsCompleted,readsTotal)*100).toFixed())//validator(readsCompleted, readsTotal)porcentaje de lecturas
      },
      quizzes : {
        total: quizzesTotal, //total quizzes presentes
        completed: quizzesCompleted, // quizzes autocompletados
        percent: parseInt((validator(quizzesCompleted,quizzesTotal)*100).toFixed()),//validator(quizzesCompleted, quizzesTotal)porcentaje de quizzes completados
        scoreSum: quizzesScoreSum, //suma de puntuaciones de los _quizzes_ completados
        scoreAvg: parseInt((validator(quizzesScoreSum,quizzesCompleted)).toFixed())//validator(quizzesScoreSum, quizzesCompleted)promedio de puntuaciones en quizzes completados
      }
    }
  }
  myList.push(usersWithStats);
  });
  return myList;
}

const sortUsers = (users, orderBy, orderDirection) => {
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
      return a.stats.exercises.completed - b.stats.exercises.completed;
    });
  }
  if(orderBy === "Porcentaje Quizzes completos") {
    myListByOrder.sort( function(a,b) {
      return a.stats.quizzes.completed - b.stats.quizzes.completed;
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

  let studentsOptions = document.getElementById("studentsOptions");
  studentsOptions.innerHTML="";
  studentsOptions.innerHTML="<tr><td>Nombre</td><td>Porcentaje</td><td>Ejercicios</td><td>Quizzes</td><td>Lecturas</td><td>Prom Quiz</td></tr>";

  studentsOptions.appendChild(document.createElement('tr'));
  let count = 1;
  // console.log("div"+count)
  myListByOrder.forEach(function(element) {
  let fileStudent = document.createElement('tr');
  fileStudent.setAttribute("id", "student" + count);
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
  quizzesPromStudent.innerText = element.stats.quizzes.scoreAvg;
  studentsOptions.appendChild(nameOfStudents);
  studentsOptions.appendChild(percentStudent);
  studentsOptions.appendChild(exercisesStudent);
  studentsOptions.appendChild(quizzesStudent);
  studentsOptions.appendChild(readsStudent);
  studentsOptions.appendChild(quizzesPromStudent);
  count++;
  studentsOptions.appendChild(document.createElement('tr'));
  });
  return myListByOrder;//arreglo de usuarios ordenados
}

const processCohortData = (options) => {
  let users = options.cohortData.users;
  // let cohort = options.cohort;
  let progress = options.cohortData.progress;
  let orderBy = options.orderBy;
  let orderDirection = options.orderDirection;
  let search = options.search;
  let courses = options.cohortData.coursesIndex;
  // console.log(courses);
  let usersFiltered = filterUsers(users, search);
  let usersWithStatus = computeUsersStats(usersFiltered, progress, courses);
  let myListOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
  return myListOrderAndFiltered;
}

window.filterUsers = filterUsers;
window.computeUsersStats = computeUsersStats;
window.sortUsers = sortUsers;
window.processCohortData = processCohortData;
