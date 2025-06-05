import services from '@/app/dashboard/serviceTypes';
import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';
import styles from "./page.module.css";
import Schedules from './Schedules';
import Link from 'next/link';

const pb = new PocketBase(`${process.env.pburl}`);

export default async function Equipment({ params }: any) {
    pb.authStore.loadFromCookie((await cookies()).get('pb_auth')?.value!);
    const { type, id } = await params;

    const equipment = await pb.collection(type).getOne(id);

    // Pega agendamentos do chrome
    let scheduleInfo = await pb.collection(`${type}_schedule_info`).getFullList(1, {
        expand: `${type},grade,class,week_days,user`
    });

    let schedules = await pb.collection(`${type}_schedule`).getFullList();

    let active = scheduleInfo.filter(i => schedules.some(s => s.schedule_info == i.id && !s.returned) && i[type].includes(id));
    active = active.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));

    let title = 'Tipo inválido';

    switch (type) {
        case services.chrome:
            title = 'Chromebook';
            break;
        case services.lab:
            title = 'Laboratório';
            break;
        case services.speaker:
            title = 'Caixa de Som';
            break;
        default:
            break;
    }

    return (
        <div className={`${styles.page}`}>
            <Link href={"/dashboard/admin"} className={`${styles.button}`}>Voltar</Link>
            <div className={`${styles.title}`}>
                <h2>{title}</h2>
                <h3>{equipment.label}</h3>
                <p>{equipment.obs ? equipment.obs : ''}</p>
            </div>
            <Schedules type={type} id={id} active={active} schedules={schedules} />
        </div>
    )
}