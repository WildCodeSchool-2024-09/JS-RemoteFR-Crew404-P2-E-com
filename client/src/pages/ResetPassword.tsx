import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../helpers/api";
function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [newPwd, setNewPwd] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await api.post("/api/reset-password", {
      token,
      email,
      newPwd,
    });
    console.info(data.data);
  };
  return (
    <section>
      <h1>Je suis le composant : `ResetPassword`</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setNewPwd(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </section>
  );
}

export default ResetPassword;
