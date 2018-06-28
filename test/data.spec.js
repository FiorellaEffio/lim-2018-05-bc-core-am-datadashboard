describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(window.computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(window.sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(window.filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(window.processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = window.fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = window.fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = window.computeUsersStats(users, progress, courses);
      assert.equal(users.length, processed.length);
      processed.forEach(user => {
      assert.ok(user.hasOwnProperty('stats'));
      assert.isNumber(user.stats.percent);
      assert.isObject(user.stats.exercises);
      assert.isObject(user.stats.quizzes);
      assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = window.computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    let user1 = {
      stats: {
        name : "Fiorella Effio",
        percent: 58,
        exercises : {
          total: 5,
          completed: 5,
          percent: 100
        },
        reads : {
          total: 10,
          completed: 3,
          percent: 30
        },
        quizzes : {
          total: 8,
          completed: 8,
          percent: 100,
          scoreSum: 640,
          scoreAvg: 80
        }
      }
    }
    let user2 = {
      stats: {
        name : "Lizeth Carmona",
        percent: 36,
        exercises : {
          total: 5,
          completed: 0,
          percent: 0
        },
        reads : {
          total: 10,
          completed: 2,
          percent: 20
        },
        quizzes : {
          total: 8,
          completed: 2,
          percent: 25,
          scoreSum: 160,
          scoreAvg: 80
        }
      }
    }
    let user3 = {
      stats: {
        name : "Annie Herrera",
        percent: 90,
        exercises : {
          total: 5,
          completed: 4,
          percent: 80
        },
        reads : {
          total: 10,
          completed: 5,
          percent: 50
        },
        quizzes : {
          total: 8,
          completed: 4,
          percent: 50,
          scoreSum: 320,
          scoreAvg: 80
        }
      }
    }
    let myUsers = [user1,user2,user3];

    it('debería retornar arreglo de usuarios ordenado por nombre ASC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Nombre", "ASC"), [user3,user1,user2])
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Nombre", "DESC"), [user2,user1,user3])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje Completitud Total", "ASC"), [user2,user1,user3])
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje Completitud Total", "DESC"), [user3,user1,user2])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje ejercicios completos", "ASC"), [user2,user3,user1])
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje ejercicios completos", "DESC"), [user1,user3,user2])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje Quizzes completos", "ASC"), [user2,user3,user1])
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje Quizzes completos", "DESC"), [user1,user3,user2])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Puntuacion promedio en quizzes", "ASC"), [user2,user3,user1])
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Puntuacion promedio en quizzes", "DESC"), [user1,user3,user2])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje de lecturas completadas", "ASC"), [user2,user1,user3])
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC',() => {
      assert.deepEqual(window.sortUsers(myUsers, "Porcentaje de lecturas completadas", "DESC"), [user3,user1,user2])
    });

  });

  describe('filterUsers(users, filterBy)', () => {

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)');

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
