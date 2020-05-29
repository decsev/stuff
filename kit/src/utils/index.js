/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'
import {color} from './theme'

// 连字符转驼峰
String.prototype.hyphenToHump = function() {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function() {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function(format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name, searchStr) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = window.location.search.substr(1).match(reg);
  if (searchStr) {
    r = searchStr.substr(1).match(reg);
  }
  if (r != null) {return decodeURI(r[2])}
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// 深复制，支持大部分类型
const deepClone = (values) => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (values == null || typeof values !== 'object') {return values;}

  // Handle Date
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  // Handle Array
  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) {copy[attr] = deepClone(values[attr]);}
    }
    return copy;
  }

  throw new Error('Unable to copy values! Its type isn\'t supported.');
};

const changeTitle = (title) => {
  document.title = title;
}

const fNum = (str, tail = 4) => {
  return parseFloat(Number(str).toFixed(tail));
}

const fPrice = (s) => {
  if (isNaN(Number(s)) || s === null || typeof s === 'object' || typeof s === 'boolean') {
    return null;
  }
  let b = '';
  if (s < 0) {
    b = '-';
  }
  s = parseFloat((s + '').replace(/[^\d\\.]/g, '')) + '';
  let l = s.split('.')[0].split('').reverse();
  let r = s.split('.')[1];   
  let t = '';   
  for (let i = 0; i < l.length; i ++) {   
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');   
  }   
  return b + t.split('').reverse().join('') + (r ? '.' + r : '');   
}
const rPrice = (s) => {
  return parseFloat(s.replace(/[^\d\\.-]/g, '')); 
}


module.exports = {
  config,
  request,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  deepClone,
  changeTitle,
  fNum,
  fPrice
}
