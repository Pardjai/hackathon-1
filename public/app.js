window.onload = function () {
   const swiper = new Swiper('.swiper', {
      pagination: {
         el: '.swiper-pagination',
         clickable: true
      }, 
      slidesPerGroup: 1,
      centeredSlides: true,
      loop: true,
      autoplay: {
         delay: 5000,
         disableOnInteraction: false
      },
      speed: 700
   });


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


   const $interactives = document.querySelector('#interactives')
   if ($interactives) {
      $interactives.addEventListener('click', (event) => {
         if (event.target.classList.contains('js-allow')) {
            const id = event.target.dataset.id
            const variant = event.target.dataset.variant
            const csrf = event.target.dataset.csrf
   
            fetch('/interactives/allow/' + id +'/'+ variant, {
               method: 'post',
               headers: {
                  'X-XSRF-TOKEN': csrf,
               },
            })
            .then((res) => res.json())
            .then((interactives) => {
               const html = interactives
                  .map((i) => {
                     return `
                     <div class="row">
                     <div class="card-container">
                        <div class="card">
                           <div class="card-content">
                              <h2 class="card-title">${i.title}</h2>
                              <span >${i.content}</span>
                           </div>
                            <button type="submit" class="btn btn-primary js-allow" data-id="${i.id}"
                                 data-csrf="${csrf}" data-variant="1" disabled>${i.variant1}</button>
                                 <b>${i.variant1Allow}</b>
                                 <br>
                                 <button type="submit" class="btn btn-primary js-allow" data-id="${i.id}"
                                 data-csrf="${csrf}" data-variant="2" disabled>${i.variant2}</button>
                                 <b>${i.variant2Allow}</b>
                        </div>
                     </div>
                  </div>
                  `
                  })
                  .join('')
               $interactives.innerHTML = html
            })
      }
         }
      )
   }




   M.Tabs.init(document.querySelectorAll(".tabs"));
   var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
};