import { useState } from "react";
import api from "../helpers/api";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await api.post("/api/forgot-password", { email });
    console.info(data.data);
  };

  return (
    <section>
      <h1>Je suis le composant : `ForgotPassword`</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset</button>
      </form>
    </section>
  );
}

export default ForgotPassword;
