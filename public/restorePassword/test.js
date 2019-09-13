const newP = document.querySelector(".result");
const passwordInput = document.getElementById("password");

passwordInput.oninput = () => {
  console.log(passwordInput.value);
  newP.innerHTML = passwordInput.value;
};
