document.addEventListener('DOMContentLoaded', () => {
  const hamsterContainer = document.querySelector('.hamsters-container');
  const addHamsterBtn = document.querySelector('#addHamster');
  const hamsterTemplate = document.querySelector('#hamsterTemplate');
  const reservationForm = document.querySelector('#reservationForm');
  const reservationNotice = document.querySelector('#reservationNotice');

  if (addHamsterBtn && hamsterContainer && hamsterTemplate) {
    addHamsterBtn.addEventListener('click', () => {
      const clone = hamsterTemplate.content.cloneNode(true);
      const hamsterIndex = hamsterContainer.childElementCount + 1;
      const heading = clone.querySelector('.hamster-heading');
      heading.textContent = `Hamster ${hamsterIndex}`;

      clone.querySelectorAll('[name]').forEach((field) => {
        const baseName = field.getAttribute('data-base');
        if (baseName) {
          field.name = `${baseName}-${hamsterIndex}`;
          field.id = `${baseName}-${hamsterIndex}`;
        }
      });

      hamsterContainer.appendChild(clone);
    });
  }

  if (reservationForm && reservationNotice) {
    reservationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      reservationNotice.textContent = 'Thank you! Your overnight hamster getaway request has been sent. We will confirm availability ASAP.';
      reservationNotice.classList.add('visible');
      reservationForm.reset();
      if (hamsterContainer) {
        hamsterContainer.querySelectorAll('.hamster-card').forEach((card, index) => {
          if (index > 0 && card.parentElement) {
            card.parentElement.removeChild(card);
          }
        });
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.classList.add('will-animate');
    observer.observe(el);
  });
});
