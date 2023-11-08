let sendButton = document.getElementById('send');

sendButton.addEventListener("mouseover", function(event) {
  sendButton.style.backgroundColor = "#FFAA28"; // 버튼의 배경색을 변경
  sendButton.style.cursor = "pointer"; // 마우스 커서 모양 변경
});

sendButton.addEventListener("mouseout", function(event) {
  sendButton.style.backgroundColor = ""; // 원래의 배경색으로 변경 (기본값)
  sendButton.style.cursor = ""; // 원래의 마우스 커서 모양으로 변경
});

function scrollToBottom() {
    let chatContent = document.querySelector('.chat-content');
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  function processResponse(response) {
    var 결과 = JSON.parse(response.data).message.result.translatedText;
    console.log(결과);
    let template2 = `<div class="line"><span class="name">마브</span>
          <img src="SarcasticMarv.png" class="profile-image">
          <div class="chat-box">${결과}</div>
        </div>`;
    document.querySelector('.chat-content').insertAdjacentHTML('beforeend', template2);

    scrollToBottom();
  }

  function enter(e) {
    if (e.code == 'Enter') {
      if (!document.querySelector('#input').value) {
        let ale = document.getElementById("alert");
        ale.style.display = 'block';
        return;
      }
      else {
        let ale = document.getElementById("alert");
        ale.style.display = 'none';
      }
  
      let userInput = document.querySelector('#input').value; // 사용자 입력 값 저장
  
      let template1 = `<div class="line"><span class="name my">나</span>
        <div class="chat-box mine">
          ${userInput}
        </div>
      </div>`;
      document.querySelector('.chat-content').insertAdjacentHTML('beforeend', template1);
      document.querySelector('#input').value = '';
      scrollToBottom();
  
      let q = 'https://port-0-marvserver-7xwyjq992llj8d1295.sel4.cloudtype.app/translate?q=' + userInput; // 저장된 사용자 입력 값 사용
      axios.get(q).then(r => {
        processResponse(r); // 응답 처리 함수 호출
      }).catch((error) => { console.log('실패', error) });
  
      scrollToBottom();
    }
  }
  
  function scrollToBottom() {
    let chatContent = document.querySelector('.chat-content');
    chatContent.scrollTop = chatContent.scrollHeight;
  }
  function processResponse(response) {
    var 결과 = JSON.parse(response.data).message.result.translatedText;
    console.log(결과);
    let template2 = `<div class="line"><span class="name">마브</span>
          <img src="SarcasticMarv.png" class="profile-image">
          <div class="chat-box">${결과}</div>
        </div>`;
    document.querySelector('.chat-content').insertAdjacentHTML('beforeend', template2);

    scrollToBottom();
  }

  document.querySelector('#send').addEventListener('click', function () {
if (!document.querySelector('#input').value) {
  let ale = document.getElementById("alert");
  ale.style.display = 'block';
  return;
}
else {
  let ale = document.getElementById("alert");
  ale.style.display = 'none';
}

let userInput = document.querySelector('#input').value; // 사용자 입력 값 저장

let template1 = `<div class="line"><span class="name my">나</span>
  <div class="chat-box mine">
    ${userInput}
  </div>
</div>`;
document.querySelector('.chat-content').insertAdjacentHTML('beforeend', template1);
document.querySelector('#input').value = '';
scrollToBottom();

let q = 'https://port-0-marvserver-7xwyjq992llj8d1295.sel4.cloudtype.app/translate?q=' + userInput; // 저장된 사용자 입력 값 사용
axios.get(q).then(r => {
  processResponse(r); // 응답 처리 함수 호출
}).catch((error) => { console.log('실패', error) });

scrollToBottom();
});