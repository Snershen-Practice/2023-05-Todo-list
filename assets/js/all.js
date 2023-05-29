let allData = [
  { content: "把冰箱發霉的檸檬拿去丟", isDone: false },
  { content: "整理電腦資料夾", isDone: false },
];

const list = document.querySelector(".list");
const input = document.querySelector(".card input");
const addBtn = document.querySelector(".btn_add");
const numText = document.querySelector(".list_footer .num");
const filterBtn = document.querySelector(".tab");

//初始化資料狀態
let tempData = allData;

//渲染頁面
function renderData(data) {
  let str = "";
  data.forEach((item, index) => {
    str += `<li>
    <label class="checkbox" for="">
      <input type="checkbox" data-value="${item.content}"/>
      <span>${item.content}</span>
    </label>
    <a href="#" class="delete" data-num="${index}"><span class="material-symbols-outlined"> close </span></a>
  </li>`;
  });
  list.innerHTML = str;
}

function filterUndo(data) {
  //記錄待辦事項數量
  const finArr = data.filter((item) => {
    return item.isDone === false;
  });
  console.log(finArr);
  numText.textContent = finArr.length;
  console.log(finArr);
}

//初始化
renderData(allData);
filterUndo(allData);

filterBtn.addEventListener("click", (e) => {
  console.log(e.target.textContent);
  //切換頁籤樣式
  if (e.target.nodeName === "LI") {
    Array.from(filterBtn.children).forEach((childBtn) => {
      childBtn.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  //根據頁籤篩選出資料
  // tempData = allData;
  if (e.target.textContent === "全部") {
    renderData(tempData);
    filterUndo(tempData);
  } else if (e.target.textContent === "待完成") {
    const ingData = tempData.filter((item) => {
      return item.isDone === false;
    });
    // console.log("待完成", ingData);
    renderData(ingData);
    filterUndo(ingData);
  } else if (e.target.textContent === "已完成") {
    const completeData = tempData.filter((item) => {
      return item.isDone === true;
    });
    // console.log("已完成",completeData);
    renderData(completeData);
    filterUndo(completeData);
  }
});

list.addEventListener("click", function (e) {
  // console.log(e, e.target.dataset.value);
  //切換資料狀態
  if (e.target.nodeName === "INPUT") {
    if (e.target.checked) {
      allData.forEach((item) => {
        if (item.content === e.target.dataset.value) {
          item.isDone = true;
        }
      });
      filterUndo(allData);
    } else if (!e.target.checked) {
      allData.forEach((item) => {
        if (item.content === e.target.dataset.value) {
          item.isDone = false;
        }
      });
      filterUndo(allData);
    }
  }
  //刪除待辦事項
  if (e.target.getAttribute("class") === "delete") {
    let num = e.target.getAttribute("data-num");
    tempData.splice(num, 1);
    renderData(tempData);
  }
});

//新增待辦事項
function addData(data) {
  if (input.value) {
    data.push({ content: input.value, isDone: false });
  }
  filterUndo(allData);
}

//事件：新增待辦事項
addBtn.addEventListener("click", function () {
  addData(tempData);
  renderData(tempData);
  input.value = "";
});

//事件：刪除所有事項
const removeAllBtn = document.querySelector(".list_footer a");
removeAllBtn.addEventListener("click", function () {
  allData = [];
  renderData(allData);
});
