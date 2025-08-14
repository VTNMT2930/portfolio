# Portfolio Võ Trung Nhân - Simple Version

Portfolio cá nhân với các chức năng cơ bản và thiết kế đơn giản.

## ✨ Tính năng chính

### 🌓 Dark/Light Mode
- Toggle button với Phosphor icons
- Tự động detect system preferences  
- Lưu preference vào localStorage
- Smooth transition effects
- Sử dụng class `.dark` để toggle theme

### 📄 CV Download
- Chức năng tải CV PDF
- File được đặt tại `assets/resume.pdf`
- Tên file tự động: `Vo_Trung_Nhan_CV.pdf`
- 2 nút download: headline và about section

### 📧 Contact Form
- Form validation cơ bản
- Loading state và success/error messages  
- Hiện tại là simulation (cần cấu hình backend cho email thực tế)

## 🚀 Cài đặt và sử dụng

### 1. Files cần thiết
```
template02/
├── index.html
├── js/script.js
├── assets/
│   ├── resume.pdf (thay bằng CV thật của bạn)
│   ├── main.css
│   └── style.css
└── README.md
```

### 2. Thay thế CV
Thay file `assets/resume.pdf` bằng CV thật của bạn.

### 3. Tùy chỉnh thông tin
Cập nhật thông tin cá nhân trong `index.html`:
- Tên, email, số điện thoại
- Links social media
- Thông tin dự án
- Kỹ năng và công nghệ

### 4. Cấu hình email (tùy chọn)
Để form gửi email thực tế, cần tích hợp với backend hoặc service như EmailJS.

## 📱 Responsive Design
- Hoạt động mượt mà trên mobile, tablet, desktop
- Touch gestures cho project modal
- Optimized cho các thiết bị khác nhau

## 🎨 Tùy chỉnh

### Colors
Template đã có hệ thống color variables hoàn chỉnh trong `assets/main.css`:
```css
/* Light theme colors */
--accent--light: #aa70e0;
--secondary--light: #7059e2;
--base--light: #e6ebf4;

/* Dark theme colors */  
--accent--dark: #E4B8BF;
--secondary--dark: #CEC4EF;
--base--dark: #111111;
```
Hệ thống tự động chuyển đổi based on `color-scheme` attribute.

### Animations
Tùy chỉnh AOS settings trong `js/script.js`:
```javascript
AOS.init({
  duration: 1000,
  easing: 'ease-in-out-cubic',
  once: true,
  offset: 50
});
```

## 🔧 Tính năng kỹ thuật

### Performance
- Lazy loading images
- Optimized animations
- Throttled scroll events
- Efficient DOM manipulation

### Accessibility
- ARIA labels và roles
- Keyboard navigation
- Focus management
- High contrast support
- Reduced motion support

### SEO
- Semantic HTML structure
- Meta tags optimization
- Open Graph tags
- Structured data

## 🌐 Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📞 Liên hệ
- Email: nhantrung297@gmail.com
- GitHub: https://github.com/VTNMT2930
- LinkedIn: https://www.linkedin.com/in/nhân-trung-võ-16965737a/

## 📝 License
MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.
