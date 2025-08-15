// ============================================================================
// Alex Walker Portfolio - JavaScript Functions
// ============================================================================

// ============================================================================
// DARK MODE FUNCTIONALITY (Compatible with original template)
// ============================================================================

/**
 * Dark Mode Toggle Handler
 * Compatible with original template's color-switcher
 */
class ThemeManager {
  constructor() {
    this.darkModeToggle = document.getElementById('color-switcher');
    this.init();
  }

  init() {
    // Load saved theme preference or default to light mode
    this.loadThemePreference();

    // Add event listener for dark mode toggle
    if (this.darkModeToggle) {
      this.darkModeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Update toggle button
    this.updateToggleButton();
  }

  loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    this.updateToggleButton();

    // Add a subtle animation effect
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }



  updateToggleButton() {
    if (!this.darkModeToggle) return;

    const isDark = document.documentElement.classList.contains('dark');
    const iconElement = this.darkModeToggle.querySelector('i');

    if (iconElement) {
      if (isDark) {
        iconElement.className = 'ph-bold ph-sun';
      } else {
        iconElement.className = 'ph-bold ph-moon-stars';
      }
    }
  }
}

// ============================================================================
// SMOOTH SCROLLING & NAVIGATION (Enhanced from original)
// ============================================================================

/**
 * Navigation Manager
 * Handles smooth scrolling, active menu highlighting, and scroll behavior
 */
class NavigationManager {
  constructor() {
    this.menuLinks = document.querySelectorAll('.menu__link');
    this.sections = document.querySelectorAll('section[id]');
    this.init();
  }

  init() {
    // Add smooth scroll behavior to menu links
    this.setupSmoothScrolling();

    // Setup scroll spy for active menu highlighting
    this.setupScrollSpy();

    // Add click handlers for menu links
    this.setupMenuClickHandlers();
  }

  setupSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 20;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupScrollSpy() {
    // Create intersection observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveMenuItem(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  setupMenuClickHandlers() {
    this.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        this.menuLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
      });
    });
  }

  updateActiveMenuItem(activeId) {
    // Remove active class from all menu links
    this.menuLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to corresponding menu link
    const activeLink = document.querySelector(`a[href="#${activeId}"]`);
    if (activeLink && activeLink.classList.contains('menu__link')) {
      activeLink.classList.add('active');
    }
  }
}

// ============================================================================
// ANIMATIONS & EFFECTS (Enhanced for original template compatibility)
// ============================================================================

/**
 * Animation Manager
 * Handles scroll animations and effects compatible with original template
 */
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    // Initialize scroll-based animations
    this.setupScrollAnimations();

    // Setup custom animations
    this.setupCustomAnimations();

    // Enhanced scroll indicator control
    this.setupScrollIndicator();

    // Setup gradient background animation
    this.setupGradientBackground();

    // Setup loader animation
    this.setupLoader();
  }

  setupScrollAnimations() {
    // Use IntersectionObserver so animations can replay when elements re-enter viewport
    const elements = document.querySelectorAll(
      '.animate-in-up, .animate-headline, .animate-card-2, .animate-card-3, .animate-card-5'
    );

    if (!('IntersectionObserver' in window)) {
      // Fallback to immediate reveal
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            // Remove visibility so animation can replay next time
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  setupCustomAnimations() {
    // Add entrance animation to avatar elements
    this.addEntranceAnimations();

    // Setup hover animations
    this.setupHoverAnimations();
  }

  addEntranceAnimations() {
    // Animate avatar elements on load
    const avatarElements = document.querySelectorAll('.avatar__block > *');
    avatarElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease';

      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }

  setupHoverAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.gallery__item, .cards__item, .achievements__item');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.transition = 'all 0.3s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  setupScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;

    const rotatingBtn = indicator.querySelector('.rotating-btn__link');
    const animationSvg = indicator.querySelector('.animate-rotation');

    // Click to scroll to portfolio
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolio = document.getElementById('portfolio');
      if (portfolio) {
        const top = portfolio.offsetTop - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });

    // Control rotation and visibility based on scroll and section
    const homeSection = document.getElementById('home');
    let isScrolling = false;
    let scrollTimeout;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Start rotation when scrolling
      if (!isScrolling && scrollY > 5) {
        isScrolling = true;
        if (animationSvg) {
          animationSvg.style.animation = 'rotation 20s linear infinite';
        }
      }

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Stop rotation after scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        if (animationSvg && scrollY <= 5) {
          animationSvg.style.animation = 'none';
        }
      }, 150);
    };

    // Visibility control based on home section
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          indicator.style.opacity = '1';
          indicator.style.pointerEvents = 'auto';
        } else {
          indicator.style.opacity = '0';
          indicator.style.pointerEvents = 'none';
        }
      });
    }, { threshold: 0.2 });

    if (homeSection) {
      intersectionObserver.observe(homeSection);
    }

    // Add scroll listener
    window.addEventListener('scroll', this.throttle(onScroll, 50), { passive: true });

    // Add CSS for rotation animation if not present
    if (!document.querySelector('#rotation-keyframes')) {
      const style = document.createElement('style');
      style.id = 'rotation-keyframes';
      style.textContent = `
        @keyframes rotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  setupGradientBackground() {
    // Animate gradient background blurs
    const blurs = document.querySelectorAll('.gradient-background .blur');

    blurs.forEach((blur, index) => {
      // Set initial random positions
      const randomX = (Math.random() - 0.5) * 800;
      const randomY = (Math.random() - 0.5) * 400;
      const randomRotation = Math.random() * 360;

      blur.style.transform = `translate3d(${randomX}px, ${randomY}px, 0px) rotate(${randomRotation}deg)`;

      // Animate continuously
      this.animateBlur(blur, index);
    });
  }

  animateBlur(blur, index) {
    const duration = 20000 + (index * 5000); // Different duration for each blur
    const randomX = (Math.random() - 0.5) * 800;
    const randomY = (Math.random() - 0.5) * 400;
    const randomRotation = Math.random() * 360;

    blur.style.transition = `transform ${duration}ms ease-in-out`;
    blur.style.transform = `translate3d(${randomX}px, ${randomY}px, 0px) rotate(${randomRotation}deg)`;

    setTimeout(() => {
      this.animateBlur(blur, index);
    }, duration);
  }

  setupLoader() {
    // Handle loader animation
    const loader = document.getElementById('loader');
    if (loader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.classList.add('loaded');
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 500);
      });
    }
  }

  // Utility function for throttling
  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// ============================================================================
// FORM HANDLING (Enhanced from original)
// ============================================================================

/**
 * Form Manager
 * Handles contact form submission and validation
 */
class FormManager {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.init();
  }

  init() {
    if (this.contactForm) {
      this.setupFormValidation();
      this.setupFormSubmission();
      this.setupEmailJS();
    }
  }

  setupEmailJS() {
    try {
      // Read config from data-attributes on the form for easy editing
      const serviceId = this.contactForm.getAttribute('data-emailjs-service');
      const templateId = this.contactForm.getAttribute('data-emailjs-template');
      const templateAdminId = this.contactForm.getAttribute('data-emailjs-template-admin');
      const toAdminAttr = this.contactForm.getAttribute('data-emailjs-to-admin');
      const publicKey = this.contactForm.getAttribute('data-emailjs-public');

      if (window.emailjs && publicKey) {
        window.emailjs.init(publicKey);
      }

      this.emailConfig = { serviceId, templateId, templateAdminId, toAdminAttr, publicKey };
    } catch (e) {
      console.warn('EmailJS init skipped:', e);
    }
  }

  setupFormValidation() {
    const inputs = this.contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      // Add real-time validation
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    this.clearFieldError(field);

    // Validate required fields
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }

    // Validate email
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    // Show error if validation fails
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.style.borderColor = '#ef4444';

    // Create or update error message
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setupFormSubmission() {
    this.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      const inputs = this.contactForm.querySelectorAll('input, textarea');
      let isFormValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        await this.submitForm();
      }
    });
  }

  async submitForm() {
    const submitButton = this.contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.innerHTML = '<span class="btn-caption">Sending...</span><i class="ph-bold ph-spinner"></i>';
    submitButton.disabled = true;

    try {
      const formData = new FormData(this.contactForm);
      const payload = {
        from_name: formData.get('Name') || '',
        from_email: formData.get('E-mail') || '',
        company: formData.get('Company') || '',
        phone: formData.get('Phone') || '',
        message: formData.get('Message') || ''
      };

      // Resolve recipient email expected by EmailJS template (often variable name: to_email)
      // Auto-reply recipient should be the user's email
      payload.to_email = payload.from_email || '';

      // Optional subject if template uses it
      const subjectHidden = this.contactForm.querySelector('input[name="form_subject"]')?.value;
      if (subjectHidden) payload.subject = subjectHidden;

      if (window.emailjs && this.emailConfig?.serviceId && this.emailConfig?.templateId) {
        // 1) Send auto-reply to the user
        await window.emailjs.send(this.emailConfig.serviceId, this.emailConfig.templateId, payload);

        // 2) Send notification to admin (optional if templateAdminId provided)
        if (this.emailConfig?.templateAdminId) {
          const adminEmail = this.emailConfig?.toAdminAttr || this.contactForm.querySelector('input[name="admin_email"]')?.value;
          const notifyPayload = {
            to_email: adminEmail || 'nhantrung297@gmail.com',
            from_name: payload.from_name,
            from_email: payload.from_email,
            company: payload.company,
            phone: payload.phone,
            message: payload.message,
            subject: this.contactForm.querySelector('input[name="form_subject"]')?.value || 'New contact message'
          };
          await window.emailjs.send(this.emailConfig.serviceId, this.emailConfig.templateAdminId, notifyPayload);
        }
      } else {
        // Fallback: simulate if EmailJS not configured yet
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      this.showSuccessMessage();
      this.contactForm.reset();

    } catch (error) {
      console.error('Email send failed:', error);
      // Surface EmailJS error text if available
      if (error?.text) {
        alert(`EmailJS error: ${error.text}`);
      }
      this.showErrorMessage();
    } finally {
      // Reset button
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  showSuccessMessage() {
    const reply = document.querySelector('.form__reply');
    if (reply) {
      reply.style.display = 'block';
      reply.style.opacity = '1';

      setTimeout(() => {
        reply.style.opacity = '0';
        setTimeout(() => {
          reply.style.display = 'none';
        }, 300);
      }, 5000);
    }
  }

  showErrorMessage() {
    // Create error message if needed
    const message = document.createElement('div');
    message.style.cssText = 'background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center;';
    message.textContent = 'Sorry, there was an error sending your message. Please try again.';

    this.contactForm.parentNode.insertBefore(message, this.contactForm);

    setTimeout(() => message.remove(), 5000);
  }
}

// ============================================================================
// PROJECT MODAL FUNCTIONALITY
// ============================================================================

/**
 * Project Modal Manager
 * Handles project modal slide functionality
 */
class ProjectModalManager {
  constructor() {
    this.modal = document.getElementById('projectModal');
    this.slides = document.querySelectorAll('.project-slide');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!this.modal) return;

    this.setupEventListeners();
    this.updateCounter();
    this.setupKeyboardNavigation();
  }

  setupEventListeners() {
    // Gallery link click handlers
    const galleryLinks = document.querySelectorAll('.gallery__link');
    galleryLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal(index);
      });
    });

    // Modal controls
    const closeBtn = this.modal.querySelector('.modal-btn--close');
    const overlay = this.modal.querySelector('.project-modal__overlay');
    const prevBtn = this.modal.querySelector('.modal-nav--prev');
    const nextBtn = this.modal.querySelector('.modal-nav--next');
    const fullscreenBtn = this.modal.querySelector('.modal-btn--fullscreen');
    const shareBtn = this.modal.querySelector('.modal-btn--share');

    if (closeBtn) closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeModal();
    });

    // Improved overlay click handling - only close when clicking directly on overlay
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        // Only close if clicking directly on the overlay, not on child elements
        if (e.target === overlay) {
          this.closeModal();
        }
      });
    }

    // Prevent modal from closing when clicking inside modal content
    const modalContainer = this.modal.querySelector('.project-modal__container');
    if (modalContainer) {
      modalContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.previousSlide();
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.nextSlide();
    });
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFullscreen();
    });
    if (shareBtn) shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.shareProject();
    });

    // Touch/swipe support
    this.setupTouchNavigation();

    // Scroll to close modal
    this.setupScrollToClose();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'Escape':
          this.closeModal();
          break;
        case 'ArrowLeft':
          this.previousSlide();
          break;
        case 'ArrowRight':
          this.nextSlide();
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.toggleFullscreen();
          }
          break;
      }
    });
  }

  setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const modalContent = this.modal.querySelector('.project-modal__content');
    if (!modalContent) return;

    modalContent.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    modalContent.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    modalContent.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Check for vertical swipe down to close modal
      if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 100) {
        this.closeModal();
        return;
      }

      // Only handle horizontal swipes (ignore vertical scrolling)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.previousSlide();
        } else {
          this.nextSlide();
        }
      }
    }, { passive: true });
  }

  setupScrollToClose() {
    let scrollTimeout;
    let wheelTimeout;
    let lastScrollTime = 0;
    let scrollDirection = 0;
    let lastScrollY = 0;
    let wheelDeltaY = 0;

    const handleScroll = (e) => {
      if (!this.isOpen) return;

      const currentTime = Date.now();
      const currentScrollY = window.scrollY || window.pageYOffset;

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        scrollDirection = 1; // scrolling down
      } else if (currentScrollY < lastScrollY) {
        scrollDirection = -1; // scrolling up
      }

      lastScrollY = currentScrollY;

      // If scrolling down and it's been more than 100ms since last scroll
      if (scrollDirection === 1 && currentTime - lastScrollTime > 100) {
        // Clear any existing timeout
        clearTimeout(scrollTimeout);

        // Set timeout to close modal after 200ms of continuous down scrolling
        scrollTimeout = setTimeout(() => {
          if (this.isOpen && scrollDirection === 1) {
            this.closeModal();
          }
        }, 200);
      }

      lastScrollTime = currentTime;
    };

    const handleWheel = (e) => {
      if (!this.isOpen) return;

      wheelDeltaY = e.deltaY;

      // If scrolling down (positive deltaY)
      if (wheelDeltaY > 0) {
        clearTimeout(wheelTimeout);

        // Close modal after 150ms of wheel down
        wheelTimeout = setTimeout(() => {
          if (this.isOpen) {
            this.closeModal();
          }
        }, 150);
      }
    };

    // Create combined handler
    this.scrollHandler = handleScroll;
    this.wheelHandler = handleWheel;
  }

  openModal(slideIndex = 0) {
    this.currentSlide = slideIndex;
    this.isOpen = true;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show modal
    this.modal.classList.add('active');

    // Show current slide
    this.showSlide(this.currentSlide);

    // Update counter
    this.updateCounter();

    // Add scroll and wheel listeners for closing modal
    if (this.scrollHandler) {
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
    if (this.wheelHandler) {
      window.addEventListener('wheel', this.wheelHandler, { passive: true });
    }

    // Add entrance animation
    setTimeout(() => {
      this.modal.style.opacity = '1';
    }, 10);
  }

  closeModal() {
    this.isOpen = false;

    // Remove scroll and wheel listeners
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.wheelHandler) {
      window.removeEventListener('wheel', this.wheelHandler);
    }

    // Add closing animation
    this.modal.style.opacity = '0';

    // Wait for animation to complete before hiding
    setTimeout(() => {
      // Restore body scroll
      document.body.style.overflow = '';

      // Hide modal completely
      this.modal.classList.remove('active');
      this.modal.style.opacity = '';

      // Hide all slides
      this.slides.forEach(slide => {
        slide.classList.remove('active');
      });
    }, 300);

    // Exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Show current slide
    if (this.slides[index]) {
      this.slides[index].classList.add('active');
    }

    this.updateCounter();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.showSlide(this.currentSlide);
  }

  updateCounter() {
    const currentElement = this.modal.querySelector('.current-slide');
    const totalElement = this.modal.querySelector('.total-slides');

    if (currentElement) currentElement.textContent = this.currentSlide + 1;
    if (totalElement) totalElement.textContent = this.totalSlides;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.modal.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  shareProject() {
    const currentSlideData = this.slides[this.currentSlide];
    if (!currentSlideData) return;

    const title = currentSlideData.querySelector('.project-slide__title')?.textContent || 'Project';
    const description = currentSlideData.querySelector('.project-slide__description')?.textContent || '';

    // Try native Web Share API first
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      const shareText = `${title}\n${description}\n${window.location.href}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
          this.showShareNotification('Link copied to clipboard!');
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showShareNotification('Link copied to clipboard!');
      }
    }
  }

  showShareNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      opacity: 0;
      transform: translateX(100px);
      transition: all 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Hide and remove notification
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// ============================================================================
// GALLERY FUNCTIONALITY (Enhanced with Project Modal)
// ============================================================================

/**
 * Gallery Manager
 * Handles photo gallery functionality with project modal integration
 */
class GalleryManager {
  constructor() {
    this.projectModal = new ProjectModalManager();
    this.init();
  }

  init() {
    // Initialize gallery if PhotoSwipe is available
    if (typeof PhotoSwipe !== 'undefined') {
      this.initPhotoSwipe();
    } else {
      // Use project modal instead of basic gallery
      console.log('Using Project Modal for gallery functionality');
    }
  }

  initPhotoSwipe() {
    // PhotoSwipe initialization code would go here
    // This would be handled by the gallery-init.js file from original template
    console.log('PhotoSwipe gallery initialized');
  }
}

// ============================================================================
// TESTIMONIALS SLIDER (Compatible with Swiper)
// ============================================================================

/**
 * Slider Manager
 * Handles testimonials slider if Swiper is available
 */
class SliderManager {
  constructor() {
    this.init();
  }

  init() {
    // Initialize Swiper if available
    if (typeof Swiper !== 'undefined') {
      this.initSwiper();
    } else {
      this.initBasicSlider();
    }
  }

  initSwiper() {
    const testimonialsSlider = document.querySelector('.swiper-testimonials');
    if (testimonialsSlider) {
      new Swiper(testimonialsSlider, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
          }
        }
      });
    }
  }

  initBasicSlider() {
    // Basic slider functionality as fallback
    const slides = document.querySelectorAll('.swiper-slide');
    const nextBtn = document.querySelector('.swiper-button-next');
    const prevBtn = document.querySelector('.swiper-button-prev');

    let currentSlide = 0;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    };

    if (slides.length > 0) {
      showSlide(0);

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          showSlide(currentSlide);
        });
      }
    }
  }
}

// ============================================================================
// MAIN APPLICATION CLASS
// ============================================================================

/**
 * Main Application Class
 * Initializes all managers and handles app lifecycle
 */
class AlexWalkerPortfolio {
  constructor() {
    this.managers = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  }

  initializeApp() {
    try {
      // Initialize all managers
      this.managers.theme = new ThemeManager();
      this.managers.navigation = new NavigationManager();
      this.managers.animation = new AnimationManager();
      this.managers.form = new FormManager();
      this.managers.gallery = new GalleryManager();
      this.managers.slider = new SliderManager();

      // App is ready
      this.onAppReady();

    } catch (error) {
      console.error('Error initializing Alex Walker Portfolio:', error);
    }
  }

  onAppReady() {
    // Remove any loading states
    document.body.classList.add('app-ready');

    // Dispatch custom event for app ready
    const appReadyEvent = new CustomEvent('portfolioAppReady', {
      detail: { managers: this.managers }
    });
    document.dispatchEvent(appReadyEvent);

    console.log('🎉 Vo Trung Nhan Portfolio initialized successfully!');
  }
}

// ============================================================================
// START APPLICATION
// ============================================================================

// Initialize the Alex Walker portfolio application
const alexWalkerPortfolio = new AlexWalkerPortfolio();

// Export for external use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AlexWalkerPortfolio,
    ThemeManager,
    NavigationManager,
    AnimationManager,
    FormManager,
    GalleryManager,
    SliderManager,
    ProjectModalManager
  };
}