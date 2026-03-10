# Portfolio Võ Trung Nhân

> Website portfolio cá nhân hiện đại với giao diện thân thiện, responsive và đầy đủ tính năng chuyên nghiệp.

## 📸 Demo

🔗 **Live Demo:** [https://nhanit.io.vn/](https://nhanit.io.vn/)

<div align="center">
  <image src="docs/home.png" width="700"/>
</div>

## ✨ Features

### 🎨 Giao diện & Trải nghiệm

- **Dark/Light Mode** - Chế độ sáng/tối với toggle mượt mà
  - Tự động phát hiện theme hệ thống
  - Lưu preference vào localStorage
  - Icon chuyển đổi động với Phosphor Icons
  - Smooth transitions cho tất cả elements

- **Responsive Design** - Tối ưu cho mọi thiết bị
  - Mobile-first approach
  - Breakpoints chuẩn cho tablet & desktop
  - Touch gestures support
  - Optimized cho các màn hình khác nhau

### 🚀 Tính năng chức năng

- **CV Download** - Tải CV dạng PDF
  - 2 nút download tiện lợi (header & about section)
  - Tự động đặt tên file: `Vo_Trung_Nhan_CV.pdf`
  - Download trực tiếp không cần reload

- **Contact Form** - Form liên hệ tích hợp
  - Validation real-time
  - Loading states & feedback messages
  - Success/Error notifications
  - Ready để tích hợp backend

- **Project Gallery** - Showcase dự án
  - Modal view cho chi tiết dự án
  - Image lazy loading
  - Smooth animations với AOS

### ⚡ Performance & SEO

- **Tối ưu hiệu năng**
  - Lazy loading images
  - Minified CSS/JS
  - Throttled scroll events
  - Efficient DOM manipulation

- **SEO Friendly**
  - Semantic HTML5
  - Meta tags đầy đủ
  - Open Graph tags
  - Structured data

- **Accessibility**
  - ARIA labels & roles
  - Keyboard navigation
  - Focus management
  - High contrast support
  - Reduced motion support

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **JavaScript (ES6+)** - Vanilla JS, Modern syntax

### Libraries & Frameworks
- **AOS** - Animate On Scroll library
- **Phosphor Icons** - Modern icon set
- **FontAwesome** - Social icons

### Tools
- **Git** - Version control
- **GitHub Pages** - Hosting

## 📁 Project Structure

```
template02/
├── index.html              # Main HTML file
├── README.md              # Documentation
│
├── assets/                # Static assets
│   ├── resume.pdf         # CV file (cần thay thế)
│   ├── main.css          # Main styles & variables
│   ├── style.css         # Component styles
│   ├── loader.css        # Loading animations
│   ├── plugins.css       # Plugin styles
│   ├── css2.css          # Additional styles
│   ├── app.js            # App configuration
│   ├── libs.min.js       # Third-party libraries
│   └── gallery-init.js   # Gallery initialization
│
└── js/
    └── script.js          # Main JavaScript logic
```

### Cấu trúc CSS Variables

```css
/* Light theme */
--accent--light: #aa70e0;
--secondary--light: #7059e2;
--base--light: #e6ebf4;

/* Dark theme */
--accent--dark: #E4B8BF;
--secondary--dark: #CEC4EF;
--base--dark: #111111;
```

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/VTNMT2930/portfolio.git
cd portfolio/template02
```

### 2️⃣ Thay thế CV

Thay file `assets/resume.pdf` bằng CV của bạn:

```bash
# Xóa file mẫu
rm assets/resume.pdf

# Copy CV của bạn vào
cp path/to/your/cv.pdf assets/resume.pdf
```

### 3️⃣ Tùy chỉnh thông tin

Mở `index.html` và cập nhật:

- **Thông tin cá nhân** (line 20-30)
  - Tên, email, số điện thoại
  - Tagline & bio

- **Social Links** (line 50-60)
  - GitHub, LinkedIn, Email
  - Thêm/bớt links theo nhu cầu

- **Projects** (line 100-200)
  - Tên dự án, mô tả
  - Technologies used
  - Links demo & source

- **Skills** (line 250-300)
  - Programming languages
  - Frameworks & tools
  - Soft skills

### 4️⃣ Tùy chỉnh Animations (Optional)

Trong `js/script.js`:

```javascript
AOS.init({
  duration: 1000,        // Animation duration
  easing: 'ease-in-out-cubic',
  once: true,           // Chỉ animate 1 lần
  offset: 50            // Trigger offset (px)
});
```

### 5️⃣ Test Local

Mở `index.html` bằng trình duyệt hoặc dùng local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (với http-server)
npx http-server -p 8000
```

Truy cập: `http://localhost:8000`

### 6️⃣ Deploy lên GitHub Pages

```bash
# Push lên GitHub
git add .
git commit -m "Update portfolio content"
git push origin main

# Enable GitHub Pages trong Settings > Pages
# Chọn branch: main, folder: / (root)
```

### 🔧 Tích hợp Email (Optional)

Để form contact gửi email thực tế, tích hợp với:

**Option 1: EmailJS**
```javascript
emailjs.send("service_id", "template_id", {
  name: formData.name,
  email: formData.email,
  message: formData.message
});
```

**Option 2: Formspree**
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
  <!-- form fields -->
</form>
```

## 👨‍💻 Author

**Võ Trung Nhân**

- 📧 Email: [nhantrung297@gmail.com](mailto:nhantrung297@gmail.com)
- 💼 LinkedIn: [https://www.linkedin.com/in/vtn2907/](https://www.linkedin.com/in/vtn2907/)
- 🐙 GitHub: [@VTNMT2930](https://github.com/VTNMT2930)
- 🌐 Portfolio: [https://nhanit.io.vn/](https://nhanit.io.vn/)

---

<div align="center">
  <sub>Built with ❤️ by Võ Trung Nhân</sub>
</div>


