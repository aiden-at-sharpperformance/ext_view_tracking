"use client";

import { useActionState } from "react";
import { login } from "./actions";

export function AdminLogin() {
  const [error, formAction, isPending] = useActionState(login, null);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <form action={formAction} style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem" }}>Admin</h1>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: 4,
            marginRight: "0.5rem",
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "0.5rem 1.5rem",
            fontSize: "1rem",
            background: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {isPending ? "..." : "Log in"}
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
        )}
      </form>
    </div>
  );
}
