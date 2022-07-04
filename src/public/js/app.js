const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

socket.addEventListener("open", handleOpen);
socket.addEventListener("close",handleClose);
socket.addEventListener("message", async(message) => {
  // console.log("New message: ", await message.data.text());
  const li = document.createElement("li");
  li.innerText = await message.data;
  messageList.append(li);
});

alert('한번 정한 아이디변경은 브라우저를 종료하기전까지 불가합니다.');

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSubmit);

function handleOpen(){
  console.log("Connected to Server✅");
}
function handleClose(){
  console.log("Disconnected from Server❌");
}
function handleNickSubmit(event){
  event.preventDefault();
  const input = nickForm.querySelector("input");
  const btn = nickForm.querySelector("button");

  socket.send(makeMessage("nickname", input.value));

  input.disabled=true;  
  btn.style.display = 'none';
  // input.value ="";
}
function handleSubmit(event){
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value ="";
}
function makeMessage(type, payload){
  const msg = {type, payload};
  return JSON.stringify(msg);
}