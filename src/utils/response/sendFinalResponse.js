const sendFinalResponse = (res, status, success, message, type, data, results) => {
    return res.status(status).json({ status, success, message, type, data, results });
  };
  export default sendFinalResponse;
  