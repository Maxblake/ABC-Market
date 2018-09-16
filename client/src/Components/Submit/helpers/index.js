export const fixDate = date => {
  return date.toString().replace(" GMT-0400 (-04)", "");
};
