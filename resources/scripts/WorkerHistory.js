worker = JSON.parse(localStorage.getItem('employee'))
var home = document.getElementById('HomeHRef')

if(worker.onTheClock)
{
    home.href = "./WorkerClockOut.html"
}
else
{
    home.href = "./WorkerClockIn.html"
}





function handleOnLoad() 
{
  getTimeCards();
}


function getTimeCards()
{

    let getURL = `https://crimsonsnacksapi321.herokuapp.com/api/TimeStamps/GetTimes/${worker.employee_ID}`

    fetch(getURL).then(
        function(response)
        {
            console.log(response)
            return response.json()
        }).then(
            function(json)
            {
            console.log(json)
            TimeCards = json 
            createBody(TimeCards);


        })

}




function createBody(TimeCards)
{

  var state = {
    'querySet': TimeCards,

    'page': 1,
    'rows': 5,
    'window': 5,
  }

  buildTable()

  function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    console.log('querySet.length:', querySet.length)
    var pages = Math.ceil(querySet.length / rows);
    

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
  }

  function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
  console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
          maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
      wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

  }


  function buildTable() {
    var table = $('#table-body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet

    for (var i = 0; i < myList.length; i++) {
        //Keep in mind we are using "Template Litterals to create rows"
        myList[i].clockOutTime != null ? tempout = myList[i].clockOutTime : tempout = ''
        myList[i].timeSpent != null ? tempspent = myList[i].timeSpent : tempspent = ''
        myList[i].description != null ? tempdes = myList[i].description : tempdes = ''
        myList[i].message != null ? tempmess = myList[i].message : tempmess = ''

        var row = `<tr>
                  <td>${myList[i].clockInTime}</td>
                  <td>${tempout}</td>
                  <td>${tempspent}</td>
                  <td>${tempdes}</td>
                  <td>${tempmess}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)
  }
}