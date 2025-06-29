---
layout: default
title: Contact
permalink: /contact/
---

<section class="contact-page">
  <div class="container">
    <div class="content">
      <h1>Get in Touch</h1>
      
      <div class="contact-content">
        <p>
          I'd love to hear from you! Whether you have a question about one of my posts, want to discuss a potential collaboration, or just want to say hello, feel free to reach out.
        </p>
        
        <div class="contact-methods">
          <div class="contact-method">
            <h3>📧 Email</h3>
            <p>
              <a href="mailto:your-email@example.com">your-email@example.com</a>
            </p>
            <p>Best for: Detailed inquiries, collaboration proposals, or professional discussions.</p>
          </div>
          
          <div class="contact-method">
            <h3>💼 LinkedIn</h3>
            <p>
              <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">linkedin.com/in/yourlinkedin</a>
            </p>
            <p>Best for: Professional networking and career-related discussions.</p>
          </div>
          
          <div class="contact-method">
            <h3>🐙 GitHub</h3>
            <p>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">github.com/yourusername</a>
            </p>
            <p>Best for: Technical discussions, code reviews, and open-source contributions.</p>
          </div>
        </div>
        
        <div class="response-info">
          <h2>Response Time</h2>
          <p>
            I typically respond to emails within 24-48 hours. For urgent matters, LinkedIn messages tend to get faster responses.
          </p>
        </div>
        
        <div class="topics">
          <h2>What I'd Love to Discuss</h2>
          <ul>
            <li>Software architecture and engineering best practices</li>
            <li>Travel recommendations and experiences</li>
            <li>Open-source collaboration opportunities</li>
            <li>Speaking engagements and conference presentations</li>
            <li>Mentoring and career guidance</li>
            <li>Freelance consulting opportunities</li>
          </ul>
        </div>
        
        <div class="disclaimer">
          <h2>A Quick Note</h2>
          <p>
            While I enjoy helping others, please note that I can't provide free detailed consulting or debugging services. For extensive technical help, I'd be happy to discuss consulting arrangements.
          </p>
          <p>
            I also receive a fair amount of email, so please be patient if it takes me a bit longer to respond during busy periods.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
.contact-content {
  font-size: 1.125rem;
  line-height: 1.8;
}

.contact-methods {
  display: grid;
  gap: 2rem;
  margin: 2rem 0;
}

.contact-method {
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.02);
}

:root.dark .contact-method {
  background: rgba(255, 255, 255, 0.02);
}

.contact-method h3 {
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.contact-method p:last-child {
  margin-bottom: 0;
  color: var(--text-light);
  font-size: 0.95rem;
}

.response-info,
.topics,
.disclaimer {
  margin-top: 2.5rem;
}

.topics ul {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.topics li {
  margin-bottom: 0.5rem;
}

.disclaimer {
  background: var(--code-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--accent-color);
}

.disclaimer h2 {
  margin-top: 0;
}

@media (max-width: 768px) {
  .contact-methods {
    grid-template-columns: 1fr;
  }
}
</style>