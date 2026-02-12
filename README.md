# Interactive Navigation Website

A modern, responsive website with dynamic navigation that features scroll-triggered animations, color transitions, and interactive hover effects.

## ✨ Features

- **Fixed Navigation Bar** - Stays visible on all pages
- **Scroll-Triggered Effects** - Background becomes translucent with blur effect when scrolled
- **Dynamic Color Transitions** - Navigation text changes from white to dark when scrolled
- **Interactive Hover Effects** - Menu items lift up, change background, and show animated underlines
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Four Interlinked Pages** - Home, About, Services, and Login
- **Smooth Animations** - CSS transitions and JavaScript-powered effects
- **Mobile Menu** - Animated hamburger menu for mobile devices
- **Accessibility Features** - Keyboard navigation and focus states

## 🚀 Demo

[Live Demo](https://your-username.github.io/interactive-navigation/) *(Update this link after deployment)*

## 📸 Screenshots

*Add screenshots of your website here*

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Advanced styling with flexbox, grid, and animations
- **Vanilla JavaScript** - Interactive functionality and smooth transitions
- **CSS Backdrop Filter** - Modern blur effects
- **Intersection Observer API** - Scroll-triggered animations

## 📁 Project Structure

```
interactive-navigation/
├── index.html          # Main HTML file
├── style.css           # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Key Components

### Navigation Features
- **Fixed positioning** with z-index management
- **Scroll detection** with throttled event listeners
- **Color scheme transitions** based on scroll position
- **Mobile-responsive** hamburger menu

### Page System
- **Single Page Application** structure
- **Smooth page transitions** without page reloads
- **Dynamic content switching** via JavaScript
- **URL-friendly** navigation system

### Interactive Elements
- **Hover animations** with transform and scale effects
- **Focus states** for accessibility
- **Loading animations** for better UX
- **Scroll progress indicator**

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/interactive-navigation.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd interactive-navigation
   ```

3. **Open in your browser**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Using a local server (recommended)
   # If you have Python installed:
   python -m http.server 8000
   # Then visit http://localhost:8000
   
   # If you have Node.js and live-server:
   npx live-server
   ```

## 🎨 Customization

### Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --bg-color: rgba(255, 255, 255, 0.85);
}
```

### Navigation Items
Add or modify navigation items in `index.html`:
```html
<li><a href="#" data-page="new-page" class="nav-link">New Page</a></li>
```

Then create the corresponding page section and add JavaScript handling.

### Animations
Adjust animation timings in `style.css`:
```css
.navbar {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (limited support)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspiration from modern web design trends
- CSS backdrop-filter for blur effects
- Intersection Observer API for scroll animations

## 📞 Contact

Your Name - [Mohammed Akeel](mailto:choudharyahmed44@gmail.com)

Project Link: [https://github.com/Mohammed-Akeel-45/SCT_WD_1](https://github.com/Mohammed-Akeel-45/SCT_WD_1)

---

⭐ Don't forget to give the project a star if you liked it!
narendra told this is all vibecoded