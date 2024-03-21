"use strict";

class Util{
  isEmptyObject(value) {
    if (value == null) {
      // null or undefined
      return false;
    }
  
    if (typeof value !== 'object') {
      // boolean, number, string, function, etc.
      return false;
    }
  
    const proto = Object.getPrototypeOf(value);
  
    // consider `Object.create(null)`, commonly used as a safe map
    // before `Map` support, an empty object as well as `{}`
    if (proto !== null && proto !== Object.prototype) {
      return false;
    }
  
    for (const prop in value) {
      if (Object.hasOwn(value, prop)) {
        return false;
      }
    }

    return true;
  }

  // isEmpty(obj) {
  //   for (const prop in obj) {
  //     if (Object.hasOwn(obj, prop)) {
  //       return false;
  //     }
  //   }
  
  //   return true;
  // }

  appResponse = (res, statusCode, message, data) => {
    const checkIfSuccess = statusCode?.toString()?.startsWith('2');
    // if (auth) return res.status(statusCode).header("auth", auth).json({success: checkIfSuccess ? true : false, message, data: data ?? null });
    return res.status(statusCode).json({success: checkIfSuccess ? true : false, message, data: data ?? null });
  }
}

module.exports = new Util();