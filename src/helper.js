export const date = (date) => {
  return date.split("-").reverse().join("/");
}

export const isValid = (attr) => {
  return typeof attr === "string" && attr.length > 0;
};