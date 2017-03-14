import '../styles/main.scss'
/*
let sock = new SockJS('http://localhost:8080/ws')
sock.onopen = function () {
  sock.send(JSON.stringify({
    type: 'auth',
    device: 'client'
  }))
}

sock.onmessage = function (e) {
  switch (JSON.parse(e.data).type) {
    case 'msg':
      var p = document.createElement('p')
      p.innerText = JSON.parse(e.data).text
      document.getElementsByClassName('log')[0].appendChild(p)
      break
    case 'setActive':
  }
}

sock.onclose = function () {
  console.log('close')
}
*/
