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

      // Initialize language and CV handlers last so DOM exists
      this.setupI18n();
      this.setupCvDropdown();

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

  setupI18n() {
    const DEFAULT_LANG = 'vi';
    const SUPPORTED = ['vi', 'en'];

    const messages = {
      vi: {
        'menu.home': 'Trang Chủ',
        'menu.portfolio': 'Dự Án',
        'menu.about': 'Về Tôi',
        'menu.resume': 'Học Vấn',
        'menu.contact': 'Liên Hệ',
        'cta.chat': 'Trò Chuyện',
        'intro.meet': "Hãy gặp gỡ!",
        'intro.title': 'Võ Trung Nhân\nIntern Backend Developer.',
        'intro.viewProjects': 'Xem Dự Án',
        'intro.downloadCv': 'Tải CV',
        'home.rotating': 'Cuộn xuống để xem thêm * Cuộn xuống để xem thêm * ',

        'avatar.cta': 'Cùng Hợp Tác!',
        'avatar.major.label': 'Chuyên ngành:',
        'avatar.major.value': 'Công nghệ kỹ thuật phần mềm',
        'avatar.address.label': 'Địa chỉ:',
        'avatar.address.value': 'Hồ Chí Minh, Việt Nam',

        'portfolio.subtitle': 'Dự Án',
        'portfolio.title': 'Dự án cá nhân',
        'portfolio.1.title': 'HỆ THỐNG TMĐT TEMPLATE SHOP',
        'portfolio.1.desc': 'Chịu trách nhiệm thiết kế, phát triển và triển khai toàn bộ hệ thống cho một website thương mại điện tử, từ giao diện người dùng đến logic nghiệp vụ phía server.',
        'portfolio.2.title': 'WEBSITE GIỚI THIỆU CÔNG TY NỘI THẤT ĐÌNH VĂN',
        'portfolio.2.desc': 'Thiết kế và phát triển website giới thiệu sản phẩm và dịch vụ của công ty nội thất, tập trung vào giao diện responsive và trải nghiệm người dùng.',
        'portfolio.3.title': 'HỆ THỐNG RÚT GỌN URL',
        'portfolio.3.desc': 'Xây dựng hệ thống API cho phép người dùng rút gọn các URL dài thành đường dẫn ngắn gọn, duy nhất. Thiết kế cơ sở dữ liệu với PostgreSQL để lưu trữ và quản lý hiệu quả các cặp URL. Sử dụng Docker để container hóa ứng dụng, đảm bảo tính nhất quán khi triển khai.',
        'portfolio.4.title': 'TRANG WEB PORTFOLIO CÁ NHÂN',
        'portfolio.4.desc': 'Phát triển trang web portfolio cá nhân để giới thiệu các dự án, kỹ năng và thông tin chuyên môn. Thiết kế tập trung vào UI sạch sẽ, hiện đại và UX responsive.',

        'about.subtitle': 'Về Bản Thân',
        'about.title': 'Mục tiêu nghề nghiệp',
        'about.p1': 'Là sinh viên năm cuối chuyên ngành Công nghệ kỹ thuật phần mềm, em có định hướng phát triển sự nghiệp lâu dài với vị trí lập trình viên Backend. Với kiến thức nền tảng vững chắc về Java, Spring Boot và cơ sở dữ liệu, kết hợp với kinh nghiệm thực tiễn qua các dự án cá nhân, em mong muốn được áp dụng kiến thức vào môi trường làm việc chuyên nghiệp.',
        'about.p2': 'Em hướng tới mục tiêu không ngừng học hỏi, đóng góp và phát triển để trở thành một Backend Developer vững mạnh, có khả năng xây dựng và tối ưu hóa các hệ thống phần mềm phức tạp.',

        'about.info.fullname.label': 'Họ tên',
        'about.info.phone.label': 'Điện thoại',
        'about.info.email.label': 'Email',
        'about.info.address.label': 'Địa chỉ',

        'services.1.title': 'Backend\nDevelopment',
        'services.1.text': 'Xây dựng RESTful API, logic nghiệp vụ và bảo mật hệ thống bằng Spring Security.',
        'services.2.title': 'Frontend\nDevelopment',
        'services.2.text': 'Xây dựng giao diện người dùng đáp ứng (responsive) và có tính tương tác cao.',
        'services.3.title': 'Database\nManagement',
        'services.3.text': 'Thiết kế và làm việc với CSDL quan hệ, sử dụng Spring Data JPA để tương tác.',
        'services.4.title': 'Tools &\nDeployment',
        'services.4.text': 'Sử dụng Git để quản lý phiên bản. Đóng gói và triển khai ứng dụng với Docker.',

        'resume.subtitle': 'Học Vấn',
        'resume.title': 'Học vấn',
        'resume.edu1.title': 'Công nghệ kỹ thuật phần mềm',
        'resume.edu1.school': 'Trường Đại học Nguyễn Tất Thành',
        'resume.edu1.desc': 'Là sinh viên năm cuối với điểm GPA hiện tại là 3.54/4.0, tập trung vào phát triển ứng dụng web và hệ thống backend.',
        'resume.tools.title': 'Công nghệ và công cụ',

        'achievements.1': 'Khách hàng hài lòng',
        'achievements.2': 'Kinh nghiệm (năm)',
        'achievements.3': 'Dự án hoàn thành',

        'contact.title': 'Liên Hệ',
        'contact.subtitle': 'Hãy cùng nhau tạo nên điều tuyệt vời!',
        'contact.sent.title': 'Đã gửi thành công!',
        'contact.sent.text': 'Cảm ơn bạn đã gửi tin nhắn. Tôi sẽ trả lời sớm nhất có thể.',
        'contact.placeholder.name': 'Họ và tên*',
        'contact.placeholder.company': 'Tên công ty',
        'contact.placeholder.email': 'Địa chỉ email*',
        'contact.placeholder.phone': 'Số điện thoại*',
        'contact.placeholder.message': 'Nội dung tin nhắn*',
        'contact.send': 'Gửi tin nhắn',
        'teaser.text': 'Muốn tìm hiểu thêm về tôi, chia sẻ về dự án của bạn hoặc chỉ đơn giản là chào hỏi? <a class="text-link-bold" href="{EMAIL}" target="_self">Hãy liên hệ với tôi</a> và tôi sẽ phản hồi sớm nhất có thể.',
        'contactLines.address': 'Địa chỉ',
        'contactLines.phone': 'Điện thoại',
        'contactLines.email': 'Email',

        'modal.tech': 'Công nghệ:',
        'modal.time': 'Thời gian:',
        'modal.role': 'Vai trò:',
        'modal.demo': 'Xem Demo',
        'modal.github': 'GitHub'
      },
      en: {
        'menu.home': 'Home',
        'menu.portfolio': 'Portfolio',
        'menu.about': 'About',
        'menu.resume': 'Resume',
        'menu.contact': 'Contact',
        'cta.chat': 'Chat',
        'intro.meet': "Let's meet!",
        'intro.title': 'Vo Trung Nhan\nIntern Backend Developer.',
        'intro.viewProjects': 'View Projects',
        'intro.downloadCv': 'Download CV',
        'home.rotating': 'Scroll down to see more * Scroll down to see more * ',

        'avatar.cta': "Let's Collaborate!",
        'avatar.major.label': 'Major:',
        'avatar.major.value': 'Software Engineering Technology',
        'avatar.address.label': 'Address:',
        'avatar.address.value': 'Ho Chi Minh City, Vietnam',

        'portfolio.subtitle': 'Portfolio',
        'portfolio.title': 'Personal projects',
        'portfolio.1.title': 'E-COMMERCE SYSTEM TEMPLATE SHOP',
        'portfolio.1.desc': 'Designed, developed, and deployed a full-stack e-commerce website, from UI to server-side business logic.',
        'portfolio.2.title': 'FURNITURE COMPANY WEBSITE',
        'portfolio.2.desc': 'Designed and developed a company website to showcase products and services with responsive UI and UX focus.',
        'portfolio.3.title': 'URL SHORTENER SYSTEM',
        'portfolio.3.desc': 'Built APIs to shorten long URLs to unique short links. Designed the database with PostgreSQL and containerized the app with Docker.',
        'portfolio.4.title': 'PERSONAL PORTFOLIO WEBSITE',
        'portfolio.4.desc': 'Developed a personal portfolio website to showcase projects, skills, and expertise with a clean UI and responsive UX.',

        'about.subtitle': 'About Me',
        'about.title': 'Career Objective',
        'about.p1': 'I am a final-year student majoring in Software Engineering Technology, aiming to build a long-term career as a Backend Developer. With a solid foundation in Java, Spring Boot, and databases, combined with hands-on experience from personal projects, I am eager to contribute in a professional environment.',
        'about.p2': 'I continuously strive to learn, contribute, and grow into a strong Backend Developer capable of building and optimizing complex software systems.',

        'about.info.fullname.label': 'Full name',
        'about.info.phone.label': 'Phone',
        'about.info.email.label': 'Email',
        'about.info.address.label': 'Address',

        'services.1.title': 'Backend\nDevelopment',
        'services.1.text': 'Build RESTful APIs, business logic, and secure systems with Spring Security.',
        'services.2.title': 'Frontend\nDevelopment',
        'services.2.text': 'Build responsive, highly interactive user interfaces.',
        'services.3.title': 'Database\nManagement',
        'services.3.text': 'Design and work with relational databases, using Spring Data JPA for data access.',
        'services.4.title': 'Tools &\nDeployment',
        'services.4.text': 'Use Git for version control. Package and deploy applications with Docker.',

        'resume.subtitle': 'Resume',
        'resume.title': 'Education',
        'resume.edu1.title': 'Software Engineering Technology',
        'resume.edu1.school': 'Nguyen Tat Thanh University',
        'resume.edu1.desc': 'Final-year student with a GPA of 3.54/4.0, focusing on web apps and backend systems.',
        'resume.tools.title': 'Technologies and tools',

        'achievements.1': 'Happy clients',
        'achievements.2': 'Years of experience',
        'achievements.3': 'Projects done',

        'contact.title': 'Contact',
        'contact.subtitle': "Let's create something great together!",
        'contact.sent.title': 'Sent successfully!',
        'contact.sent.text': "Thanks for your message. I'll get back to you as soon as possible.",
        'contact.placeholder.name': 'Full name*',
        'contact.placeholder.company': 'Company',
        'contact.placeholder.email': 'Email address*',
        'contact.placeholder.phone': 'Phone number*',
        'contact.placeholder.message': 'Your message*',
        'contact.send': 'Send message',
        'teaser.text': 'Want to learn more about me, share your project, or just say hello? <a class="text-link-bold" href="{EMAIL}" target="_self">Contact me</a> and I will reply as soon as possible.',
        'contactLines.address': 'Address',
        'contactLines.phone': 'Phone',
        'contactLines.email': 'Email',

        'modal.tech': 'Tech stack:',
        'modal.time': 'Duration:',
        'modal.role': 'Role:',
        'modal.demo': 'View Demo',
        'modal.github': 'GitHub'
      }
    };

    const applyLanguage = (lang) => {
      const dict = messages[lang] || messages[DEFAULT_LANG];
      // Update elements explicitly where safer than sprinkling many data-i18n attributes
      const map = [
        ['.menu__item:nth-child(1) .menu__caption', 'menu.home'],
        ['.menu__item:nth-child(2) .menu__caption', 'menu.portfolio'],
        ['.menu__item:nth-child(3) .menu__caption', 'menu.about'],
        ['.menu__item:nth-child(4) .menu__caption', 'menu.resume'],
        ['.menu__item:nth-child(5) .menu__caption', 'menu.contact'],
        ['#headline .headline__subtitle span', 'intro.meet'],
        ['#notify-trigger .trigger__caption', 'cta.chat'],
        ['#headline .headline__btnholder a:first-child .btn-caption', 'intro.viewProjects'],
        ['.cv-dropdown__toggle .btn-caption', 'intro.downloadCv'],
        ['section#contact .section-title p span', 'contact.title'],
        ['section#contact .section-title h2', 'contact.subtitle'],
        ['#contact form button .btn-caption', 'contact.send']
      ];

      map.forEach(([selector, key]) => {
        const el = document.querySelector(selector);
        if (el && dict[key]) el.textContent = dict[key];
      });

      // Headline title (supports line break)
      const titleEl = document.querySelector('#headline .headline__title');
      if (titleEl && dict['intro.title']) titleEl.innerHTML = dict['intro.title'].replace(/\n/g, '<br>');

      // Rotating text
      const rotateText = document.querySelector('#home textPath');
      if (rotateText && dict['home.rotating']) rotateText.textContent = dict['home.rotating'];

      // Avatar CTA button
      const avatarCta = document.querySelector('.avatar__btnholder .btn .btn-caption');
      if (avatarCta && dict['avatar.cta']) avatarCta.textContent = dict['avatar.cta'];

      // Avatar info lines (major, address)
      const avatarBlocks = document.querySelectorAll('#avatar .avatar__block h6');
      if (avatarBlocks && avatarBlocks.length >= 2) {
        const major = avatarBlocks[0];
        const address = avatarBlocks[1];
        if (major && dict['avatar.major.label'] && dict['avatar.major.value']) {
          major.innerHTML = `<small class="top">${dict['avatar.major.label']}</small> ${dict['avatar.major.value']}`;
        }
        if (address && dict['avatar.address.label'] && dict['avatar.address.value']) {
          address.innerHTML = `<small class="top">${dict['avatar.address.label']}</small> ${dict['avatar.address.value']}`;
        }
      }

      // Portfolio headings
      const pSubtitle = document.querySelector('#portfolio .h2__subtitle span');
      if (pSubtitle && dict['portfolio.subtitle']) pSubtitle.textContent = dict['portfolio.subtitle'];
      const pTitle = document.querySelector('#portfolio .h2__title');
      if (pTitle && dict['portfolio.title']) pTitle.textContent = dict['portfolio.title'];
      const projTitles = [
        dict['portfolio.1.title'],
        dict['portfolio.2.title'],
        dict['portfolio.3.title'],
        dict['portfolio.4.title']
      ];
      const projDescs = [
        dict['portfolio.1.desc'],
        dict['portfolio.2.desc'],
        dict['portfolio.3.desc'],
        dict['portfolio.4.desc']
      ];
      document.querySelectorAll('#portfolio figure .gallery__descr h5').forEach((h5, idx) => {
        if (projTitles[idx]) h5.textContent = projTitles[idx];
      });
      document.querySelectorAll('#portfolio figure .gallery__descr p.small').forEach((p, idx) => {
        if (projDescs[idx]) p.textContent = projDescs[idx];
      });

      // About section
      const aboutSub = document.querySelector('#about .section-grid-title .h2__subtitle span');
      if (aboutSub && dict['about.subtitle']) aboutSub.textContent = dict['about.subtitle'];
      const aboutTitle = document.querySelector('#about .section-grid-title .h2__title');
      if (aboutTitle && dict['about.title']) aboutTitle.textContent = dict['about.title'];
      const aboutP = document.querySelectorAll('#about .about-descr__text');
      if (aboutP[0] && dict['about.p1']) aboutP[0].textContent = dict['about.p1'];
      if (aboutP[1] && dict['about.p2']) aboutP[1].textContent = dict['about.p2'];

      // About info labels
      const infoItems = document.querySelectorAll('#about .about-info .about-info__item h6');
      infoItems.forEach(h6 => {
        const small = h6.querySelector('small.top');
        if (!small) return;
        const label = small.textContent.trim();
        if (/^Họ tên/i.test(label) && dict['about.info.fullname.label']) small.textContent = dict['about.info.fullname.label'];
        if (/^Điện thoại/i.test(label) && dict['about.info.phone.label']) small.textContent = dict['about.info.phone.label'];
        if (/^Email/i.test(label) && dict['about.info.email.label']) small.textContent = dict['about.info.email.label'];
        if (/^Địa chỉ|Address/i.test(label) && dict['about.info.address.label']) small.textContent = dict['about.info.address.label'];
      });

      // Services cards
      const serviceTitles = document.querySelectorAll('.cards__card .cards__title');
      const serviceTexts = document.querySelectorAll('.cards__card .cards__text');
      const sTitles = [dict['services.1.title'], dict['services.2.title'], dict['services.3.title'], dict['services.4.title']];
      const sTexts = [dict['services.1.text'], dict['services.2.text'], dict['services.3.text'], dict['services.4.text']];
      serviceTitles.forEach((el, idx) => { if (sTitles[idx]) el.innerHTML = sTitles[idx].replace(/\n/g, '<br>'); });
      serviceTexts.forEach((el, idx) => { if (sTexts[idx]) el.textContent = sTexts[idx]; });

      // Resume
      const resumeSub = document.querySelector('#resume .content__block.block-large .h2__subtitle span');
      if (resumeSub && dict['resume.subtitle']) resumeSub.textContent = dict['resume.subtitle'];
      const resumeTitle = document.querySelector('#resume .content__block.block-large + .content__block .h2__title');
      if (resumeTitle && dict['resume.title']) resumeTitle.textContent = dict['resume.title'];
      const eduTitle = document.querySelector('#resume .resume-lines__title');
      if (eduTitle && dict['resume.edu1.title']) eduTitle.textContent = dict['resume.edu1.title'];
      const eduSchool = document.querySelector('#resume .resume-lines__source a');
      if (eduSchool && dict['resume.edu1.school']) eduSchool.textContent = dict['resume.edu1.school'];
      const eduDesc = document.querySelector('#resume .resume-lines__descr');
      if (eduDesc && dict['resume.edu1.desc']) eduDesc.textContent = dict['resume.edu1.desc'];
      const toolsTitle = document.querySelector('#resume .section-h3 .h2__title');
      if (toolsTitle && dict['resume.tools.title']) toolsTitle.textContent = dict['resume.tools.title'];

      // Achievements
      const achTexts = document.querySelectorAll('.achievements__card .achievements__descr');
      const achMap = [dict['achievements.1'], dict['achievements.2'], dict['achievements.3']];
      achTexts.forEach((el, idx) => { if (achMap[idx]) el.textContent = achMap[idx]; });

      // Contact placeholders
      const nameInput = document.querySelector('#contact-form input[name="Name"]');
      const companyInput = document.querySelector('#contact-form input[name="Company"]');
      const emailInput = document.querySelector('#contact-form input[name="E-mail"]');
      const phoneInput = document.querySelector('#contact-form input[name="Phone"]');
      const messageInput = document.querySelector('#contact-form textarea[name="Message"]');
      if (nameInput && dict['contact.placeholder.name']) nameInput.setAttribute('placeholder', dict['contact.placeholder.name']);
      if (companyInput && dict['contact.placeholder.company']) companyInput.setAttribute('placeholder', dict['contact.placeholder.company']);
      if (emailInput && dict['contact.placeholder.email']) emailInput.setAttribute('placeholder', dict['contact.placeholder.email']);
      if (phoneInput && dict['contact.placeholder.phone']) phoneInput.setAttribute('placeholder', dict['contact.placeholder.phone']);
      if (messageInput && dict['contact.placeholder.message']) messageInput.setAttribute('placeholder', dict['contact.placeholder.message']);

      // Contact reply texts
      const replyTitle = document.querySelector('.form__reply .reply__title');
      if (replyTitle && dict['contact.sent.title']) replyTitle.textContent = dict['contact.sent.title'];
      const replyText = document.querySelector('.form__reply .reply__text');
      if (replyText && dict['contact.sent.text']) replyText.textContent = dict['contact.sent.text'];

      // Teaser paragraph (keep anchor href)
      const teaser = document.querySelector('.teaser__text');
      if (teaser && dict['teaser.text']) {
        const link = teaser.querySelector('a');
        const href = link ? link.getAttribute('href') : 'mailto:nhantrung297@gmail.com?subject=Message%20from%20your%20site';
        teaser.innerHTML = dict['teaser.text'].replace('{EMAIL}', href);
      }

      // Contact lines
      const contactLines = document.querySelectorAll('.contact-lines__data .contact-lines__title');
      if (contactLines[0] && dict['contactLines.address']) contactLines[0].textContent = dict['contactLines.address'];
      if (contactLines[1] && dict['contactLines.phone']) contactLines[1].textContent = dict['contactLines.phone'];
      if (contactLines[2] && dict['contactLines.email']) contactLines[2].textContent = dict['contactLines.email'];

      // Project modal labels and buttons
      document.querySelectorAll('.project-slide__details .project-detail .detail-label').forEach(label => {
        const txt = label.textContent.trim();
        if (/^Công nghệ:|^Tech stack:/i.test(txt) && dict['modal.tech']) label.textContent = dict['modal.tech'];
        if (/^Thời gian:|^Duration:/i.test(txt) && dict['modal.time']) label.textContent = dict['modal.time'];
        if (/^Vai trò:|^Role:/i.test(txt) && dict['modal.role']) label.textContent = dict['modal.role'];
      });
      document.querySelectorAll('.project-slide__actions .project-btn').forEach(btn => {
        const span = btn.querySelector('span');
        if (!span) return;
        if (btn.classList.contains('project-btn--primary') && dict['modal.demo']) span.textContent = dict['modal.demo'];
        if (btn.classList.contains('project-btn--secondary') && dict['modal.github']) span.textContent = dict['modal.github'];
      });

      // Project modal titles and descriptions (sync with portfolio mappings)
      const modalSlides = document.querySelectorAll('.project-modal__slides .project-slide');
      modalSlides.forEach((slide, idx) => {
        const title = slide.querySelector('.project-slide__title');
        const desc = slide.querySelector('.project-slide__description');
        const tKey = `portfolio.${idx + 1}.title`;
        const dKey = `portfolio.${idx + 1}.desc`;
        if (title && dict[tKey]) title.textContent = dict[tKey];
        if (desc && dict[dKey]) desc.textContent = dict[dKey];
      });

      const langSwitcher = document.getElementById('lang-switcher');
      if (langSwitcher) {
        const label = langSwitcher.querySelector('.lang-label');
        if (label) label.textContent = lang.toUpperCase();
      }
      document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'vi');
    };

    const saved = localStorage.getItem('lang');
    const initial = SUPPORTED.includes(saved || '') ? saved : DEFAULT_LANG;
    applyLanguage(initial);

    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
      switcher.addEventListener('click', () => {
        const current = localStorage.getItem('lang') || initial;
        const next = current === 'vi' ? 'en' : 'vi';
        localStorage.setItem('lang', next);
        applyLanguage(next);
      });
    }
  }

  setupCvDropdown() {
    // Ensure links target the correct files and still work if custom files are missing
    const viHref = 'assets/CV_Vietnamese.pdf';
    const enHref = 'assets/CV_English.pdf';

    document.querySelectorAll('.cv-dropdown').forEach(dropdown => {
      const viLink = dropdown.querySelector('.cv-option[data-lang="vi"]');
      const enLink = dropdown.querySelector('.cv-option[data-lang="en"]');
      if (viLink) viLink.setAttribute('href', viHref);
      if (enLink) enLink.setAttribute('href', enHref);
    });

    // Optional: graceful fallback to existing CV if custom files are absent
    const fallback = 'assets/CV_VoTrungNhan.pdf';
    const testImage = (url) => new Promise(resolve => {
      // Use HEAD via fetch; if blocked, resolve true and let browser handle 404
      fetch(url, { method: 'HEAD' }).then(res => resolve(res.ok)).catch(() => resolve(false));
    });

    Promise.all([testImage(viHref), testImage(enHref)]).then(([hasVi, hasEn]) => {
      document.querySelectorAll('.cv-dropdown').forEach(dropdown => {
        const viLink = dropdown.querySelector('.cv-option[data-lang="vi"]');
        const enLink = dropdown.querySelector('.cv-option[data-lang="en"]');
        if (viLink && !hasVi) viLink.setAttribute('href', fallback);
        if (enLink && !hasEn) enLink.setAttribute('href', fallback);
      });
    });

    // Prevent hash jump and manage open state for the Headline dropdown specifically
    const headlineDropdown = document.querySelector('.headline__btnholder .cv-dropdown');
    if (headlineDropdown) {
      const toggle = headlineDropdown.querySelector('.cv-dropdown__toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
        });
      }
      // Add JS hover assist to keep menu open when moving the mouse
      let hoverTimer;
      const openClass = 'is-open';
      const open = () => {
        clearTimeout(hoverTimer);
        headlineDropdown.classList.add(openClass);
      };
      const close = () => {
        hoverTimer = setTimeout(() => headlineDropdown.classList.remove(openClass), 120);
      };
      headlineDropdown.addEventListener('mouseenter', open);
      headlineDropdown.addEventListener('mouseleave', close);
    }
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