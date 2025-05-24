// Common JS for handling success modal for forms
// Expects a modal with id 'contact-success-modal' and a close button with id 'close-contact-modal'
// Call initFormSuccessModal(formId) for each form you want to use this with

function initFormSuccessModal(formId) {
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById(formId);
    var modal = document.getElementById('contact-success-modal');
    var closeBtn = document.getElementById('close-contact-modal');
    if(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(form);
        fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { 'Accept': 'application/json' }
        }).then(function(response) {
          if (response.ok) {
            form.reset();
            modal.style.display = 'block';
          } else {
            response.json().then(function(data) {
              alert(data.error || 'There was a problem submitting your form.');
            });
          }
        }).catch(function() {
          alert('There was a problem submitting your form.');
        });
      });
    }
    if(closeBtn) {
      closeBtn.onclick = function() {
        modal.style.display = 'none';
      };
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  });
}
