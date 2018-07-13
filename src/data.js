const filterUsers = (users, search) => users.filter(user => (user.name.toUpperCase()).indexOf(search.toUpperCase()) !== -1);

const computeUsersStats = (users, progress, courses) => {
  let myListWithStats = [];
  users.forEach(function(element1) {
    let uidUser = element1.id;
    let progressUser = progress[uidUser];
    let percentTotal = 0;
    let exercisesTotal = 0;
    let exercisesCompleted = 0;
    let readsTotal = 0;
    let readsCompleted = 0;
    let quizzesTotal = 0;
    let quizzesCompleted = 0;
    let quizzesScoreSum = 0;
    let empty = Object.keys(progressUser).length;
    if(empty !== 0) {
      courses.forEach(courseName => {
        if(progressUser.hasOwnProperty(courseName)) {
          if(progressUser[courseName].hasOwnProperty('percent')) {
            percentTotal += progressUser[courseName].percent;
            let progressUserByCourse = progressUser[courseName];
            Object.values(progressUserByCourse.units).forEach(unit => {
              let exercises = Object.values(unit.parts);
              exercises.forEach((part) => {
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
      percentTotal = Math.round((percentTotal/courses.length)*100)/100;
    }
    let quizzesProm = parseInt((quizzesScoreSum/quizzesCompleted).toFixed());
    let usersWithStats = {
      stats : {
        name : (element1.name).replace(/\b\w/g, function(l){ return l.toUpperCase() }),//primeraletra de cada palabra en mayuscula
        percent: percentTotal,
        exercises : {
          total: exercisesTotal,
          completed: exercisesCompleted,
          percent: parseInt((exercisesCompleted/exercisesTotal*100).toFixed())
        },
        reads : {
          total: readsTotal,
          completed: readsCompleted,
          percent: parseInt((readsCompleted/readsTotal*100).toFixed())
        },
        quizzes : {
          total: quizzesTotal,
          completed: quizzesCompleted,
          percent: parseInt((quizzesCompleted/quizzesTotal*100).toFixed()),
          scoreSum: quizzesScoreSum,
          scoreAvg: quizzesProm
        }
      }
    }
    myListWithStats.push(usersWithStats);
  });
  return myListWithStats;
}

const sortUsers = (users, orderBy, orderDirection) => {
  let myListByOrder =users;
  if(orderBy === "Nombre") {
    myListByOrder.sort( function(a, b) {
      var nameA = a.stats.name.toLowerCase(), nameB = b.stats.name.toLowerCase()
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
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
      return a.stats.quizzes.scoreSum - b.stats.quizzes.scoreSum;
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
  return myListByOrder;//arreglo de usuarios ordenados
}

const processCohortData = (options) => {
  const users = options.cohortData.users;
  const progress = options.cohortData.progress;
  const orderBy = options.orderBy;
  const orderDirection = options.orderDirection;
  const search = options.search;
  const courses = options.cohortData.coursesIndex;
  const usersFiltered = filterUsers(users, search);
  const usersWithStatus = computeUsersStats(usersFiltered, progress, courses);
  const myListOrderAndFiltered = sortUsers(usersWithStatus, orderBy, orderDirection);
  return myListOrderAndFiltered;
}

window.filterUsers = filterUsers;
window.computeUsersStats = computeUsersStats;
window.sortUsers = sortUsers;
window.processCohortData = processCohortData;
