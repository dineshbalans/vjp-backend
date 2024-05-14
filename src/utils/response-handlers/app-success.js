// class AppSuccess {
//   constructor(data, message, statusCode) {

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('2') ? 'success' : 'valid';
//     this.message = message;
//     this.data = data !== undefined ? data  : null;
//   }
// }

// export default AppSuccess;

// const AppSuccess = (res, data, message, statusCode) => {
//   res.status(200).json({
//     status: "success",
//     statusCode: statusCode,
//     message: message,
//     data: data,
//   });
// };

// export default AppSuccess;



class AppSuccess {
  constructor(data, message, statusCode) {
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('2') ? 'success' : 'valid';
    this.message = message;
    this.data = data != undefined ? data : null;
  }
}
export default AppSuccess;
