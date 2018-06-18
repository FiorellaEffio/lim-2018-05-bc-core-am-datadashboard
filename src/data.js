const cohortsLaboratoria = '../data/cohorts.json';
var users, progress;
var chargeAll = document.getElementById('buttonCharge');
chargeAll.addEventListener("click", chargeData)
function chargeData() {
  users = bringData('../data/cohorts/lim-2018-03-pre-core-pw/users.json');
  progress = bringData('../data/cohorts.json');
}

function bringData(jsonFile) {
  fetch(jsonFile).then((response)=>{
      if (response.status !== 200) {
          //Código cuando recibimos una respuesta corréctamente del servidor
          console.log("Error");
          // Solo si es que sabemos que la respuesta es JSON, o fallará
      } else{
          //Código en caso de que nos respondan con algún error
         return response.json();
         console.log(response.json);
      }
  }).then((answerJson)=>{
      //Código que usa el JSON
      let rawData = [];
      for (var i = 0; i < answerJson.length; i++) {
        rawData[i] = answerJson[i];
      }
      printingList(rawData);

  }).catch((error)=>{
       console.log("No hay resultados :(");
  });
}

function printingList(rawData) {
  console.log(rawData);
  rawData.forEach(function(element) {
  let nameOfElement = document.createElement('p');
  nameOfElement.innerText = element.id;
  studentsOptions.appendChild(nameOfElement);
  });
  return rawData;
}
console.log(users);



//Data Dashboard
// 1) computeUsersStats(users, progress, courses)
window.computeUsersStats = (users, progress, courses) => {
  // Esta función es la responsable de "crear" la lista de usuarios (estudiantes) que vamos a "pintar" en la pantalla. La idea es "recorrer" el arreglo de usuarios (users) y calcular los indicadores necesarios de progreso para cada uno. La función debe devolver un nuevo arreglo de usuarios donde a cada objeto de usuario se le debe agregar una propiedad con el nombre stats con las estadísticas calculadas.
}
//
// Argumentos
// users: Arreglo de objetos obtenido de la data en bruto.
// progress: Objeto de progreso en bruto. Contiene una llave para cada usuario (uid) con un objeto que contiene el progreso del usuario para cada curso.
// courses: Arreglo de strings con los ids de los cursos del cohort en cuestión. Esta data se puede extraer de la propiedad coursesIndex de los objetos que representan los cohorts.
// Valor de retorno
// Un arreglo de objetos usersWithStats con la propiedad stats, la cual debe ser un objeto con las siguientes propiedades:
//
// percent: Número entero entre 0 y 100 que indica el porcentaje de completitud general del usuario con respecto a todos los cursos asignados a su cohort.
// exercises: Objeto con tres propiedades:
            // total: Número total de ejercicios autocorregidos presentes en cursos del cohort.
            // completed: Número de ejercicios autocorregidos completados por el usuario.
            // percent: Porcentaje de ejercicios autocorregidos completados.
// reads: Objeto con tres propiedades:
            // total: Número total de lecturas presentes en cursos del cohort.
            // completed: Número de lecturas completadas por el usuario.
            // percent: Porcentaje de lecturas completadas.
// quizzes: Objeto con cinco propiedades:
            // total: Número total de quizzes presentes en cursos del cohort.
            // completed: Número de quizzes completadas por el usuario.
            // percent: Porcentaje de quizzes completadas.
            // scoreSum: Suma de todas las puntuaciones (score) de los quizzes completados.
            // scoreAvg: Promedio de puntuaciones en quizzes completados.
