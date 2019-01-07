
export default function formatErrorResponse(message) {
  let error = message;
  if (Array.isArray(message)) {
    error = '';
    message.forEach((msg) => {
      error = error.concat(`- ${msg}\n`);
    });
  }

  return error;
}
