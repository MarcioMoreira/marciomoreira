export function contactView() {
  return `
    <section class="contact-wrapper">
      <div class="contact-card">
        <h2>Contact Me</h2>
        <p class="muted-contact">Send me a note and it will arrive in my inbox.</p>
        <form id="contact-form" novalidate>
          <div class="contact-field">
            <label class="field-label" for="name">Your Name</label>
            <input class="input" id="name" name="name" placeholder="Insert your name..." />
          </div>
          <div class="contact-field">
            <label class="field-label" for="email">Email Address</label>
            <input class="input" id="email" name="email" type="email" placeholder="What's your email address?" required />
          </div>
          <div class="contact-field">
            <label class="field-label" for="message">Your Message</label>
            <textarea id="message" name="message" placeholder="What do you want to say?" class="input" required></textarea>
          </div>
          <div class="contact-field" style="text-align:right;margin-top:1rem">
            <button class="btn-send" type="submit">Send</button>
          </div>
          <p class="muted-contact" style="text-align:center;margin-top:0.5rem">
            Prefer email? <a href="mailto:magppmoreira@gmail.com">magppmoreira@gmail.com</a>
          </p>
        </form>
      </div>
    </section>
  `;
}
