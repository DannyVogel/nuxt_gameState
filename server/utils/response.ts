export const serverResponse = (
  statusCode: number,
  statusMessage: string = "",
  payload: any,
  message: string = ""
) => ({
  statusCode,
  statusMessage,
  payload,
  message,
});
