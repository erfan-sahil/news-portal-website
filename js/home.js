const finder = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then(res => res.json())
    .then(data => print(data.data.news_category));
};

// let newsSite = document.getElementById('news')
// newsSite.classList.add('btn btn-primary')
const print = (data) => {

  const allCategoryUl = document.getElementById('all-category');
  
  data.map( cate => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `
      <button class="btn btn-primar mx-3" id="category-btn" onclick="categoryNews('${cate.category_id}')">${cate.category_name}</button>
    `;
    allCategoryUl.appendChild(newLi);
  });
};



let categoryNews = (id) => {
  let url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showcategoryNews(data.data));

   
};




let showcategoryNews = (AllNews) => {
  // console.log(AllNews);



  const showCategoryDetails = document.getElementById('show-category-news');
  showCategoryDetails.innerHTML = ` `;
   AllNews.map(data =>  {
    console.log(data)
    let newDiv = document.createElement('div');
    newDiv.innerHTML = `
      <div class="card mb-3 p-3">
        <div class="row g-3">
          <div class="col-md-2">
            <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h2 class="card-title">${data.title}</h2>
              <p class="card-text">${data.details.slice(1,500)}</p>

          <div class ="d-flex align-items-center justify-content-evenly">

              <div class="mx">
                   <h6> ${data.author.name} </h6> 
                    <p> ${data.author.published_date ? data.author.published_date : "Unknown"} </p>
              </div>

              <div class="mx">
              <i class="fa-solid fa-eye"></i>
                    <h6 class="d-inline"> ${data.total_view ? data.total_view : 'None'}M </h6>
              </div>

              <div class="mx">
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star-half-stroke text-warning"></i>
                <i class="fa-regular fa-star text-warning"></i>

              </div>


              <div onclick="forDetailsInfo('${data._id}')">

                       <i class="fa-solid fa-arrow-right text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></i> 
              
              </div>


          </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // let categoryBtn = document.getElementById('category-btn')
    // categoryBtn.classList.add('btn btn-primary')
    showCategoryDetails.appendChild(newDiv);
  });

  document.getElementById('category-btn').addEventListener('click',function(){
    document.body.style.backgroundColor = "btn btn-primary";
  })
};




let forDetailsInfo = (news_id) =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => printDetails(data.data[0]));

    console.log(news_id)


    let printDetails = (info) =>{


      let modalDetailsinfo = document.getElementById('modal-details-info')

      modalDetailsinfo.innerHTML = `

      <div class="card">
  <img src="${info.image_url}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5> ${info.title} </h5>
    <p class="card-text">${info.details}</p>
  </div>
</div>
     
      
      `
    }


}




finder();