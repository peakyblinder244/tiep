let load = document.querySelector(".loader");
$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let Name_Film = $("#searchText").val();
    SearchMovie(Name_Film);
    sessionStorage.setItem("Name", Name_Film);
    getRequest(Name_Film);
    e.preventDefault();
  });
});
let page = 1;
function page_num() {
  let current_page = document.querySelectorAll(".page-link");
  let pre = current_page[0];
  pre.onclick = function () {
    if (page > 0) page--;
    Page_movie(sessionStorage.Name);
  };
  let next = current_page[1];
  next.onclick = function () {
    page++;

    Page_movie(sessionStorage.Name);
  };
}
page_num();
document.onload(Page_movie("Batman"));

function Page_movie(Name_Film) {
  console.log(page);
  load.classList.add("disabled");
  axios
    .get(
      "http://www.omdbapi.com/?s=" +
        Name_Film +
        "&page=" +
        page +
        "&per_page=3&apikey=9d5b240e"
    )
    .then((response) => {
      console.log(response);
      load.classList.remove("disabled");
      let Client = response.data.Search;
      let output = "";
      $.each(Client, (i, res_movie) => {
        output += `
          <div class="col-6 col-md-4 h-100">
            <div class="card" style="min-height: 40rem; margin-top:10px;  box-shadow: 10px 10px 5px #aaaaaa;">
                <img src="${res_movie.Poster}" class="card-img-top" alt="...">
                <div class="card-body h-100">
                  <h5 class="card-title" >${res_movie.Title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Year: ${res_movie.Year}</li>
                  <li class="list-group-item">Type: ${res_movie.Type}</li>
                </ul>
                <a onclick="Detail('${res_movie.imdbID}')" class="card-link" href="#">Details</a>
              </div>
          </div>
        `;
      });

      $("#Search").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function SearchMovie(Name_Film) {
  load.classList.add("disabled");
  axios
    .get("http://www.omdbapi.com/?s=" + Name_Film + "&apikey=9d5b240e")
    .then((response) => {
      console.log(response);
      load.classList.remove("disabled");
      let Client = response.data.Search;
      let output = "";
      $.each(Client, (i, res_movie) => {
        output += `
          <div class="col-6 col-md-4 h-100">
            <div class="card" style="min-height: 40rem; margin-top:10px;  box-shadow: 10px 10px 5px #aaaaaa;">
                <img src="${res_movie.Poster}" class="card-img-top" alt="...">
                <div class="card-body h-100">
                  <h5 class="card-title" >${res_movie.Title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Year: ${res_movie.Year}</li>
                  <li class="list-group-item">Type: ${res_movie.Type}</li>
                </ul>
                <a onclick="Detail('${res_movie.imdbID}')" class="card-link" href="#">Details</a>
              </div>
          </div>
        `;
      });

      $("#Search").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function Detail(id) {
  console.log(id);
  sessionStorage.setItem("movieId", id);
  window.location = "/movie/movie-details";
  return false;
}

function getRequest() {
  load.classList.add("disabled");
  let movie_Id = sessionStorage.getItem("movieId");
  console.log(movie_Id);
  axios
    .get("http://www.omdbapi.com?i=" + movie_Id + "&apikey=9d5b240e")
    .then((response) => {
      console.log(response);
      load.classList.remove("disabled");
      let Client = response.data;
      let data = `
        <div class="row ">
            <h2>${Client.Title}<p>(${Client.Released})</p></h2>
            <div class="col-md-4  ">
              <img src="${Client.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
            <div class="row">
                <div class="well">  
                  <h3>Plot</h3>
                  ${Client.Plot}
                </div>
            </div>
            <ul class="list-group">
              <li class="list-group-item"><b>Genre:</b> ${Client.Genre} </li>
              <li class="list-group-item"><b>Rated:</b> ${Client.Rated}</li>
              <li class="list-group-item"><b>Director:</b> ${Client.Director}</li>
              <li class="list-group-item"><b>Writer:</b> ${Client.Writer}</li>
              <li class="list-group-item"><b>Actors:</b> ${Client.Actors}</li>
            </ul>
          </div>
        </div>
      
      `;

      $("#HomePage").html(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
