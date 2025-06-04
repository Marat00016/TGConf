window.submitForm = function() {
  const backdrop = document.querySelector('.fancybox__backdrop');
  const form = document.querySelector('.tg-modal-partners__form');
  const button = document.querySelector('.tg-modal-partners__button-submit');
  button.disabled = true;

  const formData = {
    name: form.querySelector('input[name="name"]').value,
    phone: form.querySelector('input[name="phone"]').value,
    telegram: form.querySelector('input[name="telegram"]').value,
    company: form.querySelector('input[name="company"]').value,
    policy: form.querySelector('input[name="policy"]').checked
  };

  fetch('https://script.google.com/macros/s/AKfycbztIut__c_7IpdjAzHyobJIwjB-StNkwnZ0pbt50vUWJ_iIshke2DaR7kR5XbFtlkSJ/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Успех:', data);
      form.closest('.tg-modal-partners').style.display = 'none';
      backdrop.closest('.fancybox__backdrop').style.display = 'none';
    })
    .catch(error => {
      console.error('Ошибка:', error);
      button.disabled = false;
    });
};
