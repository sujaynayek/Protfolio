document
  .getElementById("feedback-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // prevent reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("query").value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill out all fields before submitting.");
      return;
    }

    // Submit using fetch
    fetch("/submit-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Your query has been submitted!");
          document.getElementById("feedback-form").reset(); // reset form
        } else {
          alert("❌ Error submitting the form.");
        }
      })
      .catch((err) => {
        console.error("Submit error:", err);
        alert("⚠️ Something went wrong!");
      });
  });
