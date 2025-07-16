import {Fancybox} from "@fancyapps/ui";

window.submitForm = function () {
  const form = document.querySelector('.tg-modal-partners__form');
  const button = document.querySelector('.tg-modal-partners__button-submit');
  button.disabled = true;
  button.textContent = "Отправляется...";

  const formData = {
    name: form.querySelector('input[name="name"]').value,
    phone: form.querySelector('input[name="phone"]').value,
    telegram: form.querySelector('input[name="telegram"]').value,
    company: form.querySelector('input[name="company"]').value,
    policy: form.querySelector('input[name="policy"]').checked
  };

  fetch('https://script.google.com/macros/s/AKfycbztIut__c_7IpdjAzHyobJIwjB-StNkwnZ0pbt50vUWJ_iIshke2DaR7kR5XbFtlkSJ/exec', {
    method: 'POST', headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }, body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Успех:', data);
      button.textContent = "Отправлено";
      Fancybox.show([
        {
          src: '#modal-success'
        }
      ]);
    })
    .catch(error => {
      console.error('Ошибка:', error);
      button.disabled = false;
      button.textContent = "Ошибка";
    });
};
