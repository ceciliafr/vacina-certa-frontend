"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const Login = () => {
  const router = useRouter();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Image
            src="/vacina_certa.png"
            width={160}
            height={120}
            alt="vacina_certa_logo"
          />
          <h1 className={styles.title}>Acesso ao Sistema</h1>
        </div>
        <div style={{ width: "100%" }}>
          <div className={styles.input_container}>
            <input
              type="text"
              className={styles.input}
              placeholder="CPF"
              autoFocus
            />
            <input type="text" className={styles.input} placeholder="Senha" />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <a className={styles.text_tiny}>Esqueci a Senha</a>
          </div>
          <div style={{ display: "flex", margin: "2rem 0" }}>
            <button
              className={styles.deafult_button}
              onClick={() => router.replace("/meu-cartao")}
            >
              Entrar
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <button className={styles.text_button}>
            <Link href="/cadastro">Primeiro acesso</Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
