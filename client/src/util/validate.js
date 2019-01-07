
export default function validateEmail(email) {
  const emailRegex = /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
  return emailRegex.test(email.toLowerCase());
}
