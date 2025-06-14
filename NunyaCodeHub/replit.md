# NunyaCode Hub Website

## Overview

NunyaCode Hub is a modern, futuristic educational website for an African tech training school launching July 7, 2025. The platform is designed to empower African tech talent through hands-on training in Data Analytics and Web Design, with plans to expand into Cybersecurity, UI/UX, and Networking.

## System Architecture

### Frontend Architecture
- **Pure HTML/CSS/JavaScript**: Static website architecture using vanilla web technologies
- **Multi-page Application**: Structured with separate pages for different sections (index.html, courses.html, enroll.html)
- **Mobile-first Responsive Design**: Optimized for 62% mobile traffic from African users
- **Component-based CSS**: Modular styling with CSS custom properties (variables) for consistent theming

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Orbitron, Inter)
- **Icons**: Font Awesome 6.0.0
- **Deployment**: Python HTTP server (development), GitHub Pages (production)
- **Assets**: SVG graphics for scalable icons and patterns

## Key Components

### 1. Navigation System
- Responsive navigation bar with mobile hamburger menu
- Active state management for current page highlighting
- Smooth scrolling to anchor sections

### 2. Hero Section
- Animated background with tech nodes and Adinkra patterns
- Dynamic typography with accent colors
- Call-to-action buttons with micro-interactions

### 3. Course Management
- Filterable course cards system
- Two main courses: Data Analytics and Web Design
- "Coming Soon" placeholders for future courses
- Bento grid layout with hover effects

### 4. Interactive Features
- Countdown timer to launch date (July 7, 2025)
- Testimonials carousel with automatic rotation
- AI-driven course recommendation system
- FAQ accordion functionality
- Newsletter signup integration

### 5. Form Handling
- Enrollment form with validation
- Contact form processing
- Newsletter subscription management

## Data Flow

### User Interaction Flow
1. **Landing**: Users arrive at index.html with hero section
2. **Navigation**: Seamless navigation between sections and pages
3. **Course Discovery**: Browse courses via filter system on courses.html
4. **Enrollment**: Complete registration form on enroll.html
5. **Engagement**: Newsletter signup and testimonial viewing

### Content Management
- Static content stored in HTML files
- Dynamic content handled via JavaScript
- Form submissions processed client-side with validation
- Asset optimization for African mobile users

## External Dependencies

### CDN Resources
- **Google Fonts**: Orbitron (tech aesthetic) and Inter (readability)
- **Font Awesome**: Icon library for UI elements
- **External Scripts**: Minimal external dependencies for performance

### Third-party Integrations
- **Email System**: Planned integration for welcome emails and notifications
- **Analytics**: Prepared for user tracking and engagement metrics
- **Social Media**: WhatsApp and LinkedIn integration for community building

## Deployment Strategy

### Development Environment
- **Local Server**: Python HTTP server on port 5000
- **Hot Reload**: Manual refresh during development
- **Cross-platform**: Node.js and Python modules supported

### Production Deployment
- **GitHub Pages**: Static site hosting
- **Domain**: Custom domain planned for nunyacodehub.com
- **CDN**: Leveraging GitHub's global CDN for performance
- **SSL**: Automatic HTTPS through GitHub Pages

### Performance Optimization
- **Image Optimization**: WebP format for reduced bandwidth
- **Minification**: CSS and JavaScript optimization for African mobile networks
- **Lazy Loading**: Planned for images and heavy content
- **Caching Strategy**: Browser caching for static assets

## Changelog

Changelog:
- June 14, 2025. Initial setup - Complete website implementation with all required features
- June 14, 2025. Successfully deployed and tested - All pages working, animations smooth, navigation functional

## User Preferences

Preferred communication style: Simple, everyday language.