export default {
  isString (val) {
    return sResult(val) === '[object String]'
  },
  isNuber (val) {
    return sResult(val) === '[object Number]'
  },
  isArray (val) {
    return sResult(val) === '[object Array]'
  },
  isDate (val) {
    return sResult(val) === '[object Date]'
  },
  isObject (val) {
    return sResult(val) === '[object Object]'
  },
  isBoolean (val) {
    return sResult(val) === '[object Boolean]'
  },
  isNull (val) {
    return sResult(val) === '[object Null]'
  },
  isUndefined (val) {
    return sResult(val) === '[object Undefined]'
  }
}

const sResult = value => {
  return Object.prototype.toString.call(value)
}
