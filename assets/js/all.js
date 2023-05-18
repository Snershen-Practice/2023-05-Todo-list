let data = [{ content: "把冰箱發霉的檸檬拿去丟" }, { content: "整理電腦資料夾" }];

const list = document.querySelector(".list");
const input = document.querySelector(".card input");
const addBtn = document.querySelector(".btn_add");
const num = document.querySelector(".list_footer .num");

function renderData() {
  let str = "";
  data.forEach((item, index) => {
    str += `<li>
    <label class="checkbox" for="">
      <input type="checkbox"/>
      <span>${item.content}</span>
    </label>
    <a href="#" class="delete" data-num="${index}"><span class="material-symbols-outlined"> close </span></a>
  </li>`;
  });
  list.innerHTML = str;
  //記錄待辦事項數量
  num.textContent = data.length;
}

renderData();

//新增待辦事項
function addData() {
  if (input.value) {
    data.push({ content: input.value });
  }
}

addBtn.addEventListener("click", function () {
  addData();
  renderData();
  input.value = "";
});

//刪除待辦事項
list.addEventListener("click", function (e) {
  if (e.target.getAttribute("class") !== "delete") {
    return;
  }
  let num = e.target.getAttribute("data-num");
  data.splice(num, 1);
  renderData();
});

//刪除所有事項
const removeAllBtn = document.querySelector(".list_footer a");
removeAllBtn.addEventListener("click", function () {
  data = [];
  renderData();
});
