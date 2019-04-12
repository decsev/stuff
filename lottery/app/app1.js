require('./scss/index1.scss');

function hasClass(elem, cls) {
  if (!elem) return;
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, cls) {
  if (!elem) return;
  if (!hasClass(elem, cls)) {
    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
  }
}

function removeClass(elem, cls) {
  if (!elem) return;
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

class Lottery {
  constructor(index = -1, count = 8, speed = 500, times = 0, cycle = 50, prize = -1) {
    this.index = index; // 当前转动到的位置
    this.count = count; // 奖品的数量
    this.speed = speed; // 转动的速度越小越快
    this.times = times; // 转动次数
    this.cycle = cycle; // 转动基本次数：即至少需要转动多少次再进入抽奖环节
    this.prize = prize; // 中奖位置
    this.canClick = true; // 按钮是否可点击
    this.init();
    this.prizeArr = [
      '免佣券50元',
      '免佣券10元',
      '免佣券30元',
      '免佣券15元',
      '免佣券8元',
      '免佣券5元',
      '免佣券2元',
      '平衡车 '
    ]
  }
  init() {
    const runLotteryBtn = document.querySelector('#runLottery');
    runLotteryBtn.addEventListener('click', () => {
      if (this.canClick) {
        this.canClick = false;
        this.times = 0;
        this.speed = 100;
        this.prize = (window.prize === 0 || window.prize) ? window.prize : parseInt(Math.random() * (this.count));
        this.start(); // 开始抽奖
      } else {
        // console.log('正在抽奖，无效点击');
      }
    })
  }
  roll() {
    removeClass(document.querySelector(`.lottery-unit-${this.index}`), 'active');
    this.index += 1;
    if (this.index > this.count - 1) {
      this.index = 0;
    }
    addClass(document.querySelector(`.lottery-unit-${this.index}`), 'active');
  }
  start() {
    this.times++;
    if (this.times < this.cycle) {
      this.speed = this.speed - 5;
      this.speed = this.speed > 100 ? this.speed : 100;
    } else if (this.times >= this.cycle) {
      this.speed = this.speed + 50;
    }
    if (this.times > this.cycle + 10 && this.index === this.prize) {
      setTimeout(() => {
        console.log(`恭喜您中了${this.prizeArr[this.prize]}`);
      }, this.speed + 100);
      this.canClick = true;
      return false;
    }
    setTimeout(() => {
      this.roll();
      this.start();
    }, this.speed);
  }
}

let lotteryObj = new Lottery();