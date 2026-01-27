export const sendResponse = (
  res,
  statusCode,
  message,
  data = null
) => {
  console.log('================auth res====================');
  console.log(res);
  console.log('================auth res===================='); 
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};