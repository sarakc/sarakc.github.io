# Learning Guide: Building Your Professional Website

This guide will help you use your personal website as a learning tool to acquire marketable software development skills while building a professional online presence.

## Table of Contents

1. [Current Tech Stack](#current-tech-stack)
2. [Learning Path Overview](#learning-path-overview)
3. [Phase 1: Understanding Your Codebase](#phase-1-understanding-your-codebase)
4. [Phase 2: Adding Features](#phase-2-adding-features)
5. [Phase 3: Advanced Features](#phase-3-advanced-features)
6. [Marketable Skills You're Building](#marketable-skills-youre-building)
7. [Recommended Resources](#recommended-resources)
8. [Next Steps for Professional Development](#next-steps-for-professional-development)
9. [Documenting Your Learning](#documenting-your-learning)

---

## Current Tech Stack

Your website uses modern, industry-standard technologies:

### Core Technologies

- **Vue.js 3** - Progressive JavaScript framework for building user interfaces
  - Composition API (using `<script setup>`)
  - Component-based architecture
  - Reactive data binding

- **Vite** - Next-generation frontend build tool
  - Fast development server
  - Optimized production builds
  - Hot Module Replacement (HMR)

- **Vue Router** - Official router for Vue.js
  - Client-side routing
  - Lazy-loaded route components
  - Navigation guards

### Development Tools

- **ESLint** - JavaScript linter for code quality
- **Prettier** - Code formatter for consistent style
- **Git/GitHub** - Version control and deployment

### Styling Approach

- **Custom CSS** - Component-scoped styles
- **CSS Variables** - For theming and maintainability
- **Responsive Design** - Mobile-first approach

---

## Learning Path Overview

### Beginner → Intermediate → Advanced

1. **Phase 1** (Weeks 1-2): Understand what you have
2. **Phase 2** (Weeks 3-8): Add new features and pages
3. **Phase 3** (Weeks 9+): Optimize, enhance, and deploy advanced features

---

## Phase 1: Understanding Your Codebase

### Week 1: File Structure & Basics

**Goals:**
- Understand the project structure
- Learn how Vue components work
- Understand the build process

**Tasks:**

1. **Explore the Project Structure**
   ```
   src/
   ├── assets/        # Images, CSS, icons
   ├── components/    # Reusable Vue components
   ├── views/         # Page components (routes)
   ├── router/        # Routing configuration
   ├── App.vue        # Root component
   └── main.js        # Application entry point
   ```

2. **Read Key Files**
   - Start with `src/main.js` - see how the app initializes
   - Read `src/App.vue` - understand the root component
   - Study `src/components/WelcomeItem.vue` - see component structure
   - Review `src/router/index.js` - understand routing

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:5173`
   - Open browser DevTools (F12)
   - Try making a small change and see it update instantly (HMR)

4. **Learn Vue Basics**
   - **Template Syntax**: `{{ }}`, `v-if`, `v-for`, `v-bind`, `v-on`
   - **Components**: Props, Slots, Events
   - **Script Setup**: Modern Vue 3 syntax

**Resources:**
- [Vue.js Official Tutorial](https://vuejs.org/tutorial/)
- [Vue 3 Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

### Week 2: Routing & Component Communication

**Goals:**
- Understand how routing works
- Learn component communication patterns
- Practice modifying existing components

**Tasks:**

1. **Study the Router**
   - Look at `src/router/index.js`
   - Understand route definitions
   - See how lazy loading works (`() => import(...)`)
   - Check existing views: `HomeView.vue`, `ResearchView.vue`, etc.

2. **Add a New Route**
   - Create a new view component (e.g., `BlogView.vue`)
   - Add it to the router
   - Test navigation

3. **Component Communication**
   - Study how `WelcomeItem` uses slots
   - Understand props vs events
   - Practice passing data between components

**Resources:**
- [Vue Router Documentation](https://router.vuejs.org/)
- [Component Communication Patterns](https://vuejs.org/guide/components/props.html)

---

## Phase 2: Adding Features

### Week 3-4: Multi-Page Navigation

**Goals:**
- Implement proper navigation
- Create separate pages for different content
- Learn about layout components

**Tasks:**

1. **Create a Navigation Component**
   ```vue
   <!-- src/components/Navigation.vue -->
   <template>
     <nav>
       <RouterLink to="/">Home</RouterLink>
       <RouterLink to="/research">Research</RouterLink>
       <RouterLink to="/cv">CV</RouterLink>
       <RouterLink to="/contact">Contact</RouterLink>
     </nav>
   </template>
   ```

2. **Move Content to Separate Pages**
   - Move "About" section to its own page
   - Move "Research" to `/research` route
   - Move "Contact" to `/contact` route
   - Keep header in `App.vue` (shared layout)

3. **Add Active Route Styling**
   - Use `router-link-active` class
   - Style active navigation items

**Skills Learned:**
- Component composition
- Layout patterns
- Router navigation
- CSS for navigation UI

### Week 5-6: Forms & User Interaction

**Goals:**
- Build a contact form
- Handle form validation
- Learn about form handling in Vue

**Tasks:**

1. **Create a Contact Form**
   ```vue
   <script setup>
   import { ref } from 'vue'
   
   const name = ref('')
   const email = ref('')
   const message = ref('')
   
   const handleSubmit = () => {
     // Form submission logic
   }
   </script>
   ```

2. **Add Form Validation**
   - Email format validation
   - Required field checks
   - Display error messages

3. **Form Submission Options**
   - Use a service like [Formspree](https://formspree.io/) (no backend needed)
   - Or integrate with email service

**Skills Learned:**
- Form handling
- Input validation
- Event handling
- API integration basics

**Resources:**
- [Vue Form Handling](https://vuejs.org/guide/essentials/forms.html)
- [Formspree Documentation](https://formspree.io/docs)

### Week 7-8: Content Management & Dynamic Content

**Goals:**
- Create a projects/portfolio section
- Learn about data management
- Practice with lists and conditional rendering

**Tasks:**

1. **Create a Projects Page**
   - Build a component to display projects
   - Use `v-for` to render project list
   - Add project details (images, descriptions, links)

2. **Create a Data File**
   ```javascript
   // src/data/projects.js
   export const projects = [
     {
       id: 1,
       title: "Project Name",
       description: "Description...",
       image: "/path/to/image.jpg",
       link: "https://..."
     }
   ]
   ```

3. **Add Filtering/Search**
   - Filter projects by category
   - Search functionality
   - Learn about computed properties

**Skills Learned:**
- Data management
- List rendering
- Computed properties
- Filtering and searching

---

## Phase 3: Advanced Features

### Week 9-10: Performance & Optimization

**Goals:**
- Optimize images
- Implement lazy loading
- Code splitting

**Tasks:**

1. **Image Optimization**
   - Convert images to WebP format
   - Use responsive images (`srcset`)
   - Implement lazy loading for images

2. **Code Splitting**
   - Already implemented via Vue Router!
   - Understand how it works
   - Monitor bundle sizes

3. **Performance Monitoring**
   - Use Lighthouse (Chrome DevTools)
   - Aim for 90+ scores
   - Optimize based on recommendations

**Skills Learned:**
- Performance optimization
- Image optimization
- Bundle analysis
- Web vitals

**Resources:**
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)

### Week 11-12: SEO & Accessibility

**Goals:**
- Improve SEO
- Enhance accessibility
- Add meta tags

**Tasks:**

1. **SEO Optimization**
   - Add meta tags (title, description, Open Graph)
   - Create `sitemap.xml`
   - Add structured data (JSON-LD)

2. **Accessibility (a11y)**
   - Add proper ARIA labels
   - Ensure keyboard navigation
   - Test with screen readers
   - Check color contrast

3. **Use Vue Meta Libraries**
   - Consider `@vueuse/head` for dynamic meta tags
   - Or use Vue Router's meta fields

**Skills Learned:**
- SEO best practices
- Web accessibility (WCAG)
- Semantic HTML
- Meta tag management

**Resources:**
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

### Week 13+: Advanced Features

**Optional Advanced Features:**

1. **Dark Mode Toggle**
   - Use CSS variables
   - Persist preference in localStorage
   - Smooth transitions

2. **Blog Section**
   - Markdown support
   - Static site generation concepts
   - Or use a headless CMS

3. **Analytics**
   - Google Analytics
   - Privacy-focused alternatives (Plausible, etc.)

4. **Animations**
   - CSS transitions
   - Vue transitions
   - Page transitions

---

## Marketable Skills You're Building

### Frontend Development

- ✅ **Modern JavaScript (ES6+)**
  - Arrow functions, destructuring, modules
  - Async/await, promises

- ✅ **Vue.js Framework**
  - Component-based architecture
  - Composition API
  - Reactive programming

- ✅ **Build Tools**
  - Vite (modern alternative to Webpack)
  - Module bundling
  - Development tooling

- ✅ **CSS & Styling**
  - Modern CSS features
  - Responsive design
  - CSS variables
  - Component-scoped styles

- ✅ **Version Control**
  - Git workflows
  - GitHub Pages deployment
  - CI/CD basics

### Professional Practices

- ✅ **Code Quality**
  - ESLint for linting
  - Prettier for formatting
  - Clean, maintainable code

- ✅ **Project Structure**
  - Organized file structure
  - Separation of concerns
  - Reusable components

- ✅ **Documentation**
  - README files
  - Code comments
  - Learning documentation

---

## Recommended Resources

### Official Documentation (Start Here)

1. **Vue.js**
   - [Vue.js Guide](https://vuejs.org/guide/introduction.html)
   - [Vue.js API Reference](https://vuejs.org/api/)
   - [Vue Router](https://router.vuejs.org/)

2. **Vite**
   - [Vite Guide](https://vitejs.dev/guide/)
   - [Vite Config Reference](https://vitejs.dev/config/)

### Learning Platforms

1. **Free Resources**
   - [Vue School (Free Courses)](https://vueschool.io/courses)
   - [MDN Web Docs](https://developer.mozilla.org/)
   - [JavaScript.info](https://javascript.info/)

2. **Paid Resources (Optional)**
   - [Vue Mastery](https://www.vuemastery.com/)
   - [Frontend Masters](https://frontendmasters.com/)

### YouTube Channels

- Vue.js official channel
- Traversy Media
- The Net Ninja

### Practice & Community

- [Vue.js Discord](https://discord.com/invite/vue)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/vue.js)
- [GitHub Vue.js Topics](https://github.com/topics/vue)

---

## Next Steps for Professional Development

### Immediate Next Steps (This Month)

1. **Complete Phase 1**
   - Understand your current codebase
   - Make small modifications to practice

2. **Set Up Development Environment**
   - Install VS Code extensions:
     - Volar (Vue language support)
     - ESLint
     - Prettier
   - Configure your editor

3. **Start a Learning Journal**
   - Document what you learn each day
   - Note challenges and solutions
   - Track your progress

### Short-Term Goals (Next 3 Months)

1. **Add Multi-Page Navigation**
   - Implement proper navigation component
   - Create separate pages for content

2. **Build a Contact Form**
   - Learn form handling
   - Integrate with a service

3. **Create a Projects Section**
   - Showcase your work
   - Practice with dynamic content

### Medium-Term Goals (3-6 Months)

1. **Performance Optimization**
   - Achieve 90+ Lighthouse scores
   - Optimize images and assets

2. **SEO & Accessibility**
   - Improve search visibility
   - Ensure WCAG compliance

3. **Add Advanced Features**
   - Dark mode
   - Animations
   - Blog section (optional)

### Long-Term Goals (6+ Months)

1. **Expand Your Portfolio**
   - Add more projects
   - Create case studies
   - Show your learning journey

2. **Learn Related Technologies**
   - TypeScript (add type safety)
   - Testing (Vitest, Playwright)
   - Backend basics (if interested)

3. **Contribute to Open Source**
   - Find Vue.js projects
   - Make small contributions
   - Build your GitHub profile

---

## Documenting Your Learning

### Keep a Learning Log

Create a file (e.g., `LEARNING_LOG.md`) to track:

```markdown
## Week of [Date]

### What I Learned
- [ ] Topic 1
- [ ] Topic 2

### Challenges Faced
- Problem: ...
- Solution: ...

### Code Changes
- Modified: `src/components/X.vue`
- Added: New feature Y

### Resources Used
- Link to tutorial/article
- Documentation reference
```

### GitHub as Your Portfolio

1. **Keep Commits Meaningful**
   - Write clear commit messages
   - Commit frequently
   - Show your learning process

2. **Use Issues for Planning**
   - Create issues for features
   - Track your progress
   - Show project management skills

3. **Write Good README**
   - Document your project
   - Explain your tech stack
   - Show your thought process

### Showcase Your Progress

1. **Before/After Comparisons**
   - Take screenshots of improvements
   - Document refactoring
   - Show code quality improvements

2. **Blog About It (Optional)**
   - Write about what you learn
   - Share challenges and solutions
   - Build your online presence

---

## Tips for Success

### 1. Start Small
- Don't try to learn everything at once
- Focus on one concept at a time
- Build incrementally

### 2. Practice Regularly
- Code a little every day (even 30 minutes)
- Consistency beats intensity
- Use your website as a practice ground

### 3. Read Code
- Study other Vue.js projects on GitHub
- Read the Vue.js source code (advanced)
- Learn from examples

### 4. Build Real Features
- Don't just follow tutorials
- Apply what you learn to your site
- Solve real problems

### 5. Ask for Help
- Use Vue.js Discord
- Stack Overflow
- Don't get stuck for too long

### 6. Celebrate Progress
- Track your improvements
- Compare your code from week to week
- Recognize how far you've come

---

## Common Learning Path Mistakes to Avoid

1. **Skipping Fundamentals**
   - Don't jump to advanced topics
   - Master basics first (JavaScript, HTML, CSS)

2. **Tutorial Hell**
   - Don't just watch tutorials
   - Build your own projects
   - Apply what you learn

3. **Perfectionism**
   - Your code doesn't need to be perfect
   - Ship features, iterate later
   - Learn from mistakes

4. **Isolation**
   - Join communities
   - Ask questions
   - Learn from others

---

## Conclusion

Your personal website is now a clean, maintainable codebase that serves as both:
- **A professional portfolio** to showcase your work
- **A learning project** to develop marketable skills

Remember: Every professional developer started where you are. The key is consistent practice, building real projects, and never stopping learning.

**Your journey starts now. Happy coding! 🚀**

---

## Quick Reference

### Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run format       # Format code

# Git
git status           # Check changes
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

### Key Files to Know

- `src/main.js` - App entry point
- `src/App.vue` - Root component
- `src/router/index.js` - Routing config
- `vite.config.js` - Build configuration
- `package.json` - Dependencies

### Getting Help

- Vue.js Docs: https://vuejs.org
- Vue Router: https://router.vuejs.org
- Vite: https://vitejs.dev
- Vue Discord: https://discord.com/invite/vue
