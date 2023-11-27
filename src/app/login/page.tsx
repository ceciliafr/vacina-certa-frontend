"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import "date-fns/locale/pt-BR";
import { useState } from "react";
import { Title } from "@/components/Title";
import { Layout } from "@/components/Layout";
import { RightContent } from "@/components/Layout/RightContent";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { availableVaccinesData } from "@/mocks/available_vaccines";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useMutation } from "@tanstack/react-query";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  const router = useRouter();
  const [document, setDocument] = useState("");

  // return (
  //   <main className={styles.main}>
  //     <div className={styles.content}>
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           gap: "1rem",
  //         }}
  //       >
  //         <Image
  //           src="/vacina_certa.png"
  //           width={160}
  //           height={120}
  //           alt="vacina_certa_logo"
  //         />
  //         <h1 className={styles.title}>Acesso ao Sistema</h1>
  //       </div>
  //       <div style={{ width: "100%" }}>
  //         <div className={styles.input_container}>
  //           <input
  //             type="text"
  //             className={styles.input}
  //             placeholder="CPF"
  //             autoFocus
  //           />
  //           <input type="text" className={styles.input} placeholder="Senha" />
  //         </div>

  //         <div style={{ display: "flex", justifyContent: "flex-end" }}>
  //           <a className={styles.text_tiny}>Esqueci a Senha</a>
  //         </div>
  //         <div style={{ display: "flex", margin: "2rem 0" }}>
  //           <button
  //             className={styles.deafult_button}
  //             onClick={() => router.replace("/")}
  //           >
  //             Entrar
  //           </button>
  //         </div>
  //       </div>
  //       <div style={{ width: "100%" }}>
  //         <button className={styles.text_button}>
  //           <Link href="/cadastro">Primeiro acesso</Link>
  //         </button>
  //       </div>
  //     </div>
  //   </main>
  // );

  return <LoginForm />;
};

export default Login;
