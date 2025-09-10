function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    successDiv.classList.remove('show');
    setTimeout(() => {
      try {
        if (successDiv.parentNode) {
          successDiv.remove();
        }
      } catch (error) {
        console.warn('Error removing success message:', error);
      }
    }, 300);
  }, 3000);
}

function sendEmail(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    showSuccessMessage('Please enter a valid email address (e.g., example@gmail.com)');
    return;
  }
  
  const templateParams = {
    user_name: name,
    user_email: email,
    message: message
  };
  
  emailjs.send('service_r9m9lzh', 'template_3prbv6a', templateParams)
  .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    showSuccessMessage('Message sent successfully!');
    document.querySelector('.contact-form').reset();
  })
  .catch((error) => {
    console.log('FAILED...', error);
    showSuccessMessage('Failed to send message. Please try again.');
  });
}

const TYPING_TEXT = 'Basava Govardhan';
const TYPING_SPEED = 100;

function typeWriter() {
  const element = document.getElementById('typing-name');
  if (!element) return;
  
  let i = 0;
  
  function type() {
    if (i < TYPING_TEXT.length && element) {
      element.textContent += TYPING_TEXT.charAt(i);
      i++;
      setTimeout(type, TYPING_SPEED);
    }
  }
  type();
}

window.addEventListener('load', typeWriter);

let scrollTimeout;
window.addEventListener('scroll', function() {
  if (scrollTimeout) return;
  
  scrollTimeout = setTimeout(() => {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
      scrollTimeout = null;
      return;
    }
    
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= documentHeight - 100) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
    
    scrollTimeout = null;
  }, 16);
});
