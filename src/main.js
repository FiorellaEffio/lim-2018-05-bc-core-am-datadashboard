var chargeAll = document.getElementById('buttonCharge');
chargeAll.addEventListener("click", chargeData)
function chargeData() {
  bringData('../data/cohorts.json');
  // bringData('../data/cohorts/lim-2018-03-pre-core-pw/users.json');
  // bringData('../data/cohorts/lim-2018-03-pre-core-pw/progress.json');
}

function bringData(jsonFile) {
  fetch(jsonFile).then((response)=>{
      return response.json();
  }).then((answerJson)=>{
    let users = [];
    let cohorts = [];
    let progress = [];
    for (var i = 0; i < answerJson.length; i++) {
      cohorts[i] = answerJson[i];
    }
    let jsonFile = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
    fetch(jsonFile).then((response) =>{
      return response.json();
      }).then((answerJson)=>{
        for (var i = 0; i < answerJson.length; i++) {
          users[i] = answerJson[i];
        }
        let jsonFile = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
        fetch(jsonFile).then((response) =>{
          return response.json();
        }).then((answerJson)=>{
          for (var i = 0; i < answerJson.length; i++) {
            progress[i] = answerJson[i];
          }
          printingList(users, cohorts);
        });
      });
  });
}

function printingList(users, cohorts) {
  console.log(users);
  console.log(cohorts);
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
    },
    name : users[2].name,
    cohort: cohorts[2].id
  }
  console.log(usersWithStats);
  // rawData.forEach(function(element) {
  // let nameOfElement = document.createElement('p');
  // nameOfElement.innerText = element.intro.totalDuration;
  // studentsOptions.appendChild(nameOfElement);
  // });
  // return rawData;
}
