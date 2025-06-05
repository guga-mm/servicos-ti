'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PocketBase from "pocketbase";
import Cookies from "js-cookie";

export default function Realtime({ interval = 20000 }) {
    const pb = new PocketBase(`${process.env.pburl}`);

    // Carrega sessão dos cookies
    pb.authStore.loadFromCookie(Cookies.get('pb_auth')!);
    pb.autoCancellation(false);

    const router = useRouter();

    // Atualiza baseado no intervalo setado
    useEffect(() => {
        const timer = setInterval(() => {
            router.refresh();
        }, interval);
        return () => clearInterval(timer);
    }, [router, interval]);

    // Atualiza sempre que alguma coisa for alterada, adicionada ou removida nas 3 tabelas de agendamentos
    useEffect(() => {
        pb.collection('chrome_schedule_info').subscribe('*', (e) => {
            router.refresh();
        });
        pb.collection('speaker_schedule_info').subscribe('*', (e) => {
            router.refresh();
        });
        pb.collection('lab_schedule_info').subscribe('*', (e) => {
            router.refresh();
        });
        return () => {
            pb.collection('chrome_schedule_info').unsubscribe('*');
            pb.collection('speaker_schedule_info').unsubscribe('*');
            pb.collection('lab_schedule_info').unsubscribe('*');
            return;
        };
    }, [router]);

    return (
        <></>
    );
}