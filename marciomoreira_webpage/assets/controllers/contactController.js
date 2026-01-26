import { contactView } from "../../views/contactView.js";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/magppmoreira@gmail.com";

export function contactController() {
  const app = document.getElementById("app");
  app.innerHTML = contactView();

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || ""
    };

    if (!payload.email && !payload.message) {
      alert("Please provide your email or a message.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`Send failed (${res.status})`);

      app.innerHTML = `
        <section class="contact-wrapper">
          <div class="contact-card" style="text-align:center">
            <h2>Thank you!</h2>
            <p class="muted-contact">Your message is on its way. I will reply soon.</p>
          </div>
        </section>
      `;
    } catch (err) {
      alert("Could not send the message. Please try again or email me directly at magppmoreira@gmail.com.");
      console.error("Contact form send failed", err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send";
      }
    }
  });
}
