window.computeUsersStats = (users, progress, courses) => {
  // Esta función es la responsable de "crear" la lista de usuarios (estudiantes) que vamos a "pintar" en la pantalla. La idea es "recorrer" el arreglo de usuarios (users) y calcular los indicadores necesarios de progreso para cada uno. La función debe devolver un nuevo arreglo de usuarios donde a cada objeto de usuario se le debe agregar una propiedad con el nombre stats con las estadísticas calculadas.
  // progress: Objeto de progreso en bruto. Contiene una llave para cada usuario (uid) con un objeto que contiene el progreso del usuario para cada curso.
  // courses: Arreglo de strings con los ids de los cursos del cohort en cuestión. Esta data se puede extraer de la propiedad coursesIndex de los objetos que representan los cohorts.

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
  // La función `sortUsers()` se encarga de _ordenar_ la lista de usuarios creada con
  // `computeUsersStats()` en base a `orderBy` y `orderDirection`.
  // * `users`: Arreglo de objetos creado con `computeUsersStats()`.
  // * `orderBy`: String que indica el criterio de ordenado. Debe permitir ordenar
  //   por nombre, porcentaje de completitud total, porcentaje de ejercicios
  //   autocorregidos completados, porcentaje de quizzes completados, puntuación
  //   promedio en quizzes completados, y porcentaje de lecturas completadas.
  // * `orderDirection`: La dirección en la que queremos ordenar. Posibles valores:
  //   `ASC` y `DESC` (ascendiente y descendiente).
  return myListByOrder;//arreglo de usuarios ordenados

}

window.filterUsers = (users, search) => {
  // * `users`: Arreglo de objetos creado con `computeUsersStats()`.
  // * `search`: String de búsqueda.
  return myListFiltered;//lista de usuarios con coincidencia en search
}

window.processCohortData = (options) => {
  // Esta función es la que deberíamos usar al seleccionar un cohort y cada vez que
  // el usuario cambia los criterios de ordenado y filtrado en la interfaz. Esta
  // función debe invocar internamente a `computeUsersStats()`, `sortUsers()` y
  // `filterUsers()`.
  var options = {
    cohort: 0,//objeto cohort de la lista de cohorts
    cohortData : {
      users: [],
      progress : {

      }
    },
    orderBy: 0,//string del sortUsers
    orderDirection: 0,//string del sortUsers
    search:0//string del filterUsers
  }
  var myListOrderAndFiltered = {
    stats: 0//ver computeUsersStats
  }
  return myListOrderAndFiltered;
}

            // 1. Permitir al usuario seleccionar un cohort de una lista de cohorts.
            // 2. Al seleccionar un cohort:
            //    - Listar las estudiantes de ese cohort
            //    - Para cada estudiante:
            //      + Calcular porcentaje de completitud de todos los _cursos_.
            //      + Calcular grado de completitud de _lecturas_, _ejercicios autocorregidos_,
            //        y _quizzes_.
            //    - Ordenar estudiantes por completitud _general_ (porcentaje consumido/completado
            //      de todos los cursos del cohort en cuestión), de _lecturas_, _ejercicios
            //      autocorregidos_ y _quizzes_.
            //    - Filtrar/buscar estudiantes por nombre.
