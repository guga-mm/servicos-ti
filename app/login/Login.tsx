'use client'

import Pocketbase from "pocketbase";
import Cookies from "js-cookie";
import { useSearchParams } from 'next/navigation';

const pb = new Pocketbase(`${process.env.pburl}`);

export default function Login() {
    const searchParams = useSearchParams();

    const login = async () => {
        try {
            pb.authStore.clear();
            
            // Autentica usuário
            const authData = await pb.collection('users').authWithOAuth2({
                provider: 'google'
            });

            if (!pb.authStore.isValid) return;

            // Torna email público
            const publicEmail = await pb.collection('users').update(authData.record.id, {
                emailVisibility: true
            });

            // Salva sessão nos cookies
            Cookies.set('pb_auth', pb.authStore.exportToCookie({ httpOnly: true }));

            const continuePath = searchParams.get('continue');

            // Redireciona página
            if (continuePath) {
                window.location.replace(`http://colegiosatelite.zapto.org/dashboard/${continuePath}`);
            } else {
                window.location.replace(`http://colegiosatelite.zapto.org/dashboard`);
            }
            
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <button onClick={login}>Login</button>
    )
}