export default function auth({ next, store, to }) {
  if (localStorage.activeUser) {
    const userLogin = JSON.parse(localStorage?.activeUser);
    if (userLogin?.role === "vendor" && to.name !== "transations") {
      return next({ name: "transations" });
    } else {
      if (to.name === "transations") {
        return next({ name: "home" });
      } else {
        return next();
      }
    }
  }
  return next({ name: "Login" });
}
