import { cookies, headers } from "next/headers";
import Pocketbase from "pocketbase";
import styles from "./layout.module.css";
import Logout from "./Logout";
import Realtime from "./Realtime";

const pb = new Pocketbase(`${process.env.pburl}`);

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Carrega sessão dos cookies
  pb.authStore.loadFromCookie((await cookies()).get('pb_auth')?.value!);
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  return (
    <div className={`${styles.container} --font-montserrat`}>
      {pathname != '/dashboard/view' && <div className={`${styles.logout}`}>
        <img src={`${pb.baseURL}/api/files/users/${pb.authStore.record?.id}/${pb.authStore.record?.avatar}`} alt="avatar" />
        <p>Olá, {pb.authStore.record?.name}</p>
        <Logout />
        <Realtime />
      </div>}
      {children}
    </div>
  )
}