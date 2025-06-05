'use client'

import Pocketbase from "pocketbase";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const pb = new Pocketbase(`${process.env.pburl}`);

export default function Logout() {
    const logout = async () => {
        try {
            // Remove sessão dos cookies
            pb.authStore.clear();
            Cookies.remove('pb_auth');
        } catch (e) {
            console.error(e);
        } finally {
            redirect('/login');
        }
    };

    return (
        <button onClick={logout}>Logout</button>
    )
}