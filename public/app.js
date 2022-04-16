window.onload = function () {
   const $alertConfirmPassword = document.querySelector(
      "#alertConfirmPassword"
   );
   const $inputPassword = document.querySelector("#password");
   const $inputConfirmPassword = document.querySelector("#confirm");
   const $btnSubmit = document.querySelector(
      'button[data-role="submitConfirmingForm"]'
   );

   if ($alertConfirmPassword && $inputConfirmPassword && $inputPassword) {
      $inputConfirmPassword.addEventListener("input", (e) => {
         $alertConfirmPassword.removeAttribute("hidden");
         if ($inputPassword.value === $inputConfirmPassword.value) {
            $alertConfirmPassword.setAttribute("hidden", true);
            $btnSubmit.removeAttribute("disabled");
         } else {
            $btnSubmit.setAttribute("disabled", true);
         }
      });

      $inputPassword.addEventListener("input", (e) => {
         $alertConfirmPassword.removeAttribute("hidden");
         if ($inputPassword.value === $inputConfirmPassword.value) {
            $alertConfirmPassword.setAttribute("hidden", true);
            $btnSubmit.removeAttribute("disabled");
         } else {
            $btnSubmit.setAttribute("disabled", true);
         }
      });
   }

   function addShowPassFunctional(field) {
      field.addEventListener("click", (e) => {
         if (e.target.classList.contains("btn-show-pass")) {
            const $button = e.target;
            const $inputField = button.parentNode;
            const $input = inputField.children[0];

            if ($input.attributes.type.nodeValue === "password") {
               $input.setAttribute("type", "text");
               $button.children[0].classList.add("clicked");
            } else {
               $input.setAttribute("type", "password");
               $button.children[0].classList.remove("clicked");
            }
         }
      });
   }
   const $register = document.querySelector("#register");
   const $login = document.querySelector("#login");
   const $newPassword = document.querySelector("#new-password");
   if ($register) {
      addShowPassFunctional($register);
   }
   if ($login) {
      addShowPassFunctional($login);
   } else if ($newPassword) {
      addShowPassFunctional($newPassword);
   }

   M.Tabs.init(document.querySelectorAll(".tabs"));
   var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
};