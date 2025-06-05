import Login from "./Login";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={`${styles.login}`}>
                <h2>Faça Login</h2>
                <p>Utilize sua conta institucional do Colégio Satélite!</p>
                <Login />
            </div>
    )
}