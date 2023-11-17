"use client";
import styles from "./page.module.css";
import { MobileNavbar } from "@/components/Navbar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

 const MENU_ITEMS = [
   {
     id: "1",
     title: "Meu Cartão de Vacinas",
     route: "/meu-cartao",
     icon: "/book.png",
   },
   {
     id: "2",
     title: "Vacinas Pendentes",
     route: "/vacinas-pendentes",
     icon: "/notification.png",
   },
   {
     id: "3",
     title: "Registrar Vacinação",
     route: "/registrar-vacinacao",
     icon: "/agenda.png",
   },
   {
     id: "4",
     title: "Todas as Vacinas",
     route: "/todas-as-vacinas",
     icon: "/vacina.png",
   },
   {
     id: "5",
     title: "Meu Perfil",
     route: "/meu-perfil",
     icon: "/user.png",
   },
 ];

 export default function Home() {
   const router = useRouter();

   return (
     <main className={styles.main}>
       <div>
         <div
           style={{
             padding: "1rem 0 0",
             display: "flex",
             justifyContent: "center",
             background: "#a4d7c0",
           }}
         >
           <Image
             src="/medical_care.svg"
             alt="medical_care_icon"
             width={450}
             height={150}
             priority
           />
         </div>
         <div>
           {/* <Navbar /> */}
           <h1 className={styles.title}>Olá, Fulano</h1>
           <Box className={styles.menu_container}>
             {MENU_ITEMS.map((item) => (
               <Paper
                 key={item.id}
                 elevation={1}
                 onClick={() => router.push(item.route)}
                 className={styles.menu_item}
               >
                 <Image
                   src={item.icon}
                   alt={item.icon}
                   width={40}
                   height={40}
                   priority
                 />
                 <p className={styles.icon_text}>{item.title}</p>
               </Paper>
             ))}
           </Box>
         </div>
       </div>
       <Link href="/login" onClick={() => alert("loggout")}>
         <div className={styles.loggout_container}>Sair</div>
       </Link>
     </main>
   );
 }
