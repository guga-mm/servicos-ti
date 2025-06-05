
import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';
import AdminServices from './AdminServices';
import Return from '@/app/Return';
import styles from "./page.module.css";

const pb = new PocketBase(`${process.env.pburl}`);

export default async function Admin() {
    pb.authStore.loadFromCookie((await cookies()).get('pb_auth')?.value!);
    
    pb.autoCancellation(false);

    const chromes = await pb.collection('chrome').getFullList(1);
    const labs = await pb.collection('lab').getFullList(1);
    const speakers = await pb.collection('speaker').getFullList(1);

    let chromeScheduleInfo = await pb.collection('chrome_schedule_info').getFullList(1, {
        expand: `chrome,grade,class,week_days,user`
    });

    let chromeSchedule = await pb.collection('chrome_schedule').getFullList();

    let labScheduleInfo = await pb.collection('lab_schedule_info').getFullList(1, {
        expand: `lab,grade,class,week_days,user`
    });
    
    let labSchedule = await pb.collection('lab_schedule').getFullList();

    let speakerScheduleInfo = await pb.collection('speaker_schedule_info').getFullList(1, {
        expand: `speaker,grade,class,week_days,user`
    });

    let speakerSchedule = await pb.collection('speaker_schedule').getFullList();

    return (
        <div className={`${styles.page}`}>
            <Return />
            <h2>Painel de Administrador</h2>
            <AdminServices data={{ chromes, labs, speakers, chromeScheduleInfo: chromeScheduleInfo, chromeSchedule: chromeSchedule, labScheduleInfo: labScheduleInfo, labSchedule: labSchedule, speakerScheduleInfo: speakerScheduleInfo, speakerSchedule: speakerSchedule }} />
        </div>
    )
}