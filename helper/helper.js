
module.exports = {

  showValidationErrorResponse: (message) => {
    var resData = {
      status: 'failure',
      status_code: 200,
      error_code: 5002,
      error_description: 'Validation Error!',
      message: __(message),
      data: {},
      error: {},
    };
    return resData;
  },

  showInternalServerErrorResponse: (message) => {

    var resData = {
      status: 'failure',
      status_code: 200,
      error_code: 5003,
      error_description: 'Internal Coding error or Params Undefined!',
      message: message,
      data: {},
      error: {},
    };
    return resData;
  },

  showUnathorizedErrorResponse: (message) => {

    var resData = {
      status: 'failure',
      status_code: 200,
      error_code: 5004,
      error_description: 'Invalid Login Credential!',
      message: __(message),
      data: {},
      error: {},
    };
    return resData;

  },

  showDatabaseErrorResponse: (message, error) => {

    var resData = {
      status: 'failure',
      status_code: 200,
      error_code: 5005,
      error_description: 'Database error!',
      message: __(message),
      data: {},
      error: error,
    };
    return resData;

  },


  showSuccessResponse: (message, data) => {
    var resData = {
      status: 'success',
      status_code: 200,
      message: __(message),
      data: data,
    };
    return resData;
  },
  showSuccessResponseCount: (message, data, count) => {
    var resData = {
      status: 'success',
      status_code: 200,
      message: __(message),
      data: data,
      totalcount: count,
    };
    return resData;
  },


};
