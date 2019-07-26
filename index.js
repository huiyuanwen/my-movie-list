(function () {
  //   write your code here

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  //使用 getElementById 選出 <div id="data-panel">

  //accessing data by axios

  axios  //連結了電影資料庫的 Index API，並且將回應資料放進 data 這個變數裡
    .get(`https://movie-list.alphacamp.io/api/v1/movies/`)
    .then((response) => {
      // for (let item of response.data.results) {
      //   data.push(item)
      // }  迭代器

      //利用"展開運算子:展開陣列元素" 的方式將回應資料放入data array裡面
      data.push(...response.data.results)

      //調用函式 >> 在我們成功把資料放進 data 之後，就應該把 data 的內容輸出到網頁裡。
      displayDataList(data)
    })
    .catch((err) => console.log(err))

  // listen to data panel 使用事件委派
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      // console.log(event.target) 將事件綁定在外層元素上
      //再透過 event.target 來判斷哪個子元素觸發了點擊事件

      console.log(event.target.dataset.id)
      //抓dataPanel's 特定電影的id
    }
  })


  //利用 data 變數，透過 DOM 操作將電影訊息印在首頁上
  //撰寫一個函式 displayDataList 來演算需要的 template literal
  //使用 innerHTML 將演算好的 template literal 放進 < div id = "data-panel" >

  function displayDataList(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6>${item.title}</h6>
            </div>

            <!-- "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  function showMovie (id) {
    // get elements
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')

    // set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data.results
      console.log(data)

      // insert data into modal ui
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`
    })
  }


})()



