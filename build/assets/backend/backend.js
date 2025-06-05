document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.tg-modal-partners__form');
  if (!form) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

   
    const formData = {
      name: form.querySelector('input[name="name"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      telegram: form.querySelector('input[name="telegram"]').value,
      company: form.querySelector('input[name="company"]').value,
      policy: form.querySelector('input[name="policy"]').checked
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbztIut__c_7IpdjAzHyobJIwjB-StNkwnZ0pbt50vUWJ_iIshke2DaR7kR5XbFtlkSJ/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        body: JSON.stringify(formData)
      })

      window.fancybox.close()
      window.fancybox.show([
        { src: "#modal-feedback-success", type: "inline" }
      ])
    } catch (error) {
      console.error(error)
      window.fancybox.close()
      window.fancybox.show([
        { src: "#modal-feedback-error", type: "inline" }
      ])
    } finally {
      event.target.reset();
    }
  })
})
