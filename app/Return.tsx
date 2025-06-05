'use client';

import { useRouter } from "next/navigation";
import styles from "./return.module.css";

export default function Return() {
  const router = useRouter();

  const handleReturn = () => {
    // Página anterior
    const referrer = document.referrer;
    const isSameOrigin = referrer && referrer.startsWith(window.location.origin);

    if (isSameOrigin) {
      // Voltar para a última página
      router.back();
    } else {
      // Ir para o início
      router.push('/');
    }
  }

  return (
    <button className={`${styles.button}`} onClick={handleReturn}>Voltar</button>
  )
}