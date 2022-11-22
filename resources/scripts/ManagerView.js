Manager = JSON.parse(localStorage.getItem('employee'))




function handleOnLoad() 
{
  getTimeCards();
}


function getTimeCards()
{
    
    let getURL = `https://crimsonsnacksapi321.herokuapp.com/api/TimeStamps/GetDPTTimes/${Manager.department_Name}`

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
                  <td>${myList[i].employee_ID}</td>
                  <td>${myList[i].employee_Name}</td>
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



// function createBody(TimeCards)
// {

//     TimeCards.forEach((timeCard)=>
//     {

//         let tr2 = document.createElement('TR')
//         tr2.id = "tbtr" //table body table row
//         TB.appendChild(tr2)


//         let td1 = document.createElement('TD')
//         td1.width = 200;
//         td1.appendChild(document.createTextNode(`${timeCard.employee_ID}`))
//         TB.appendChild(td1)

//         let td2 = document.createElement('TD')
//         td2.width = 200;
//         td2.appendChild(document.createTextNode(`${timeCard.employee_Name}`))
//         TB.appendChild(td2)

//         let td3 = document.createElement('TD')
//         td3.width = 200;
//         td3.appendChild(document.createTextNode(`${timeCard.clockInTime}`))
//         TB.appendChild(td3)

//         let td4 = document.createElement('TD')
//         td4.width = 200;
//         td4.appendChild(document.createTextNode(`${timeCard.clockOutTime}`))
//         TB.appendChild(td4)

//         let td5 = document.createElement('TD')
//         td5.width = 200;
//         td5.appendChild(document.createTextNode(`${timeCard.timeSpent}`))
//         TB.appendChild(td5)

//         let td6 = document.createElement('TD')
//         td6.width = 200;
//         timeCard.description != null ? td6.appendChild(document.createTextNode(`${timeCard.description}`)) : td6.appendChild(document.createTextNode(''))
//         TB.appendChild(td6)

//         let td7 = document.createElement('TD')
//         td7.width = 200;
//         timeCard.message != null ? td7.appendChild(document.createTextNode(`${timeCard.message}`)) : td7.appendChild(document.createTextNode(''))
//         TB.appendChild(td7)

//     })

//     console.log(TB)
// }