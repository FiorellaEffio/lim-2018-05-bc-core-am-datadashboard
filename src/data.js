// const form = document.getElementById('search-form');
// const searchField = document.getElementById('search-keyword');
// const responseContainer = document.getElementById('response-container');
// let searchedForText;
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   responseContainer.innerHTML = '';
//   searchedForText = searchField.value;
//   getNews();
// })

  const dataRequest = new XMLHttpRequest();
  dataRequest.open('GET', "/data/cohorts/lim-2018-03-pre-core-pw/users.json");
  dataRequest.onload = function () {
    if(dataRequest.status>=200 && dataRequest.status<400) {
      let data = JSON.parse(dataRequest.responseText);
      console.log(data);
    } else {
      dataRequest.onerror = handleError;
    }
  };
  dataRequest.send();
  console.log(dataRequest);

function handleError() {
  console.log('Se ha presentado un error');
}
