require('./scss/index.scss');
const resetBtn = document.querySelector('#reset');
const startBtn = document.querySelector('#start');
const rollText = document.querySelector('#rollText');
let lotteryArr = [];
let takeOutArr = [];
let takeOutVal = null;
let state = false; // 是否在运行
function roll(arr) { // 滚动数字
  if (arr.length === 0) {
    rollText.innerHTML = '所有号码已抽出，没有更多未中奖的号码了';
    return;
  }
  let i = 0;
  window.timer = setInterval(() => {
    if (i >= arr.length) {
      i = 0;
    }
    rollText.innerHTML = arr[i];
    takeOutVal = arr[i];
    i++;
  }, 80)
}
function initArr(arr) { // 打乱数组
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let j = parseInt(Math.random() * (len - 1));
    let tempI = arr[i];
    arr[i] = arr[j];
    arr[j] = tempI;
  }
  return arr;
}
function renderTakeOutList(arr) {
  const takeOutListHtml = document.querySelector('#takeOutList');
  let temp = '';
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      temp += `<li>第${i + 1}个中奖号码是：${arr[i]}</li>`;
    }
    takeOutListHtml.innerHTML = temp;
  } else {
    takeOutListHtml.innerHTML = '中奖号码列表';
  }
}
startBtn.addEventListener('click', () => {
  if (!state) {
    let startValue = Number(document.querySelector('#startInput').value);
    let endValue = Number(document.querySelector('#endInput').value);
    if (!startValue && startValue !== 0) {
      alert('请输入始值');
      return;
    }
    if (!endValue && endValue !== 0) {
      alert('请输入终值');
      return;
    }
    if (startValue >= endValue) {
      alert('终值需大于始值');
      return;
    }
    let len = endValue - startValue + 1;
    lotteryArr = [];
    for (let i = 0; i < len; i++) {
      if (takeOutArr.indexOf(i + startValue) === -1) {
        lotteryArr.push(i + startValue);
      }
    }
    lotteryArr = initArr(lotteryArr);
    roll(lotteryArr);
    state = true;
    startBtn.innerHTML = '停';
  } else {
    clearInterval(window.timer);
    if (!!takeOutVal || takeOutVal === 0) {
      takeOutArr.push(takeOutVal);
      takeOutVal = undefined;
    }
    renderTakeOutList(takeOutArr);
    state = false;
    startBtn.innerHTML = '开始';
  }
})

resetBtn.addEventListener('click', () => {
  takeOutArr = [];
  renderTakeOutList(takeOutArr);
  rollText.innerHTML = 'ready';
  state = false;
  clearInterval(window.timer);
  startBtn.innerHTML = '开始';
})