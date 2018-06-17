const dataRequest = new XMLHttpRequest();
dataRequest.open('GET', "../data/cohorts/lim-2018-03-pre-core-pw/users.json");
dataRequest.onload = function () {
  if(dataRequest.status>=200 && dataRequest.status<400) {
  var data = JSON.parse(dataRequest.responseText);
  let arrayStudents = [];
  for(i=0;i<735;i++) {
      arrayStudents[i] = (data[i]);
  }
  console.log(arrayStudents);
  } else {
    dataRequest.onerror = handleError;
  }
};
dataRequest.send();
console.log(dataRequest);
console.log(arrayStudents);
function handleError() {
  console.log('Se ha presentado un error');
}
