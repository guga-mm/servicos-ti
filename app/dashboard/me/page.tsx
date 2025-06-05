import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';
import ScheduleCategory from './ScheduleCategory';
import Return from '@/app/Return';
import styles from './page.module.css';

const pb = new PocketBase(`${process.env.pburl}`);

export default async function Me() {
    pb.authStore.loadFromCookie((await cookies()).get('pb_auth')?.value!);

    let chromeInfo = await pb.collection('chrome_schedule_info').getFullList(1, {
        expand: `chrome,grade,class,week_days`
    });

    let chromeSchedule = await pb.collection('chrome_schedule').getFullList(1, {
        expand: `chrome`
    });

    chromeInfo = chromeInfo.filter(i => i.user == pb.authStore.record?.id && chromeSchedule.some(s => s.schedule_info == i.id && !s.returned));

    let labInfo = await pb.collection('lab_schedule_info').getFullList(1, {
        expand: `lab,grade,class,week_days`
    });

    let labSchedule = await pb.collection('lab_schedule').getFullList(1, {
        expand: `lab`
    });

    labInfo = labInfo.filter(i => i.user == pb.authStore.record?.id  && labSchedule.some(s => s.schedule_info == i.id && !s.returned));

    let speakerInfo = await pb.collection('speaker_schedule_info').getFullList(1, {
        expand: `speaker,grade,class,week_days`
    });

    let speakerSchedule = await pb.collection('speaker_schedule').getFullList(1, {
        expand: `speaker`
    });

    speakerInfo = speakerInfo.filter(i => i.user == pb.authStore.record?.id  && speakerSchedule.some(s => s.schedule_info == i.id && !s.returned));

    return (
        <div className={`${styles.container}`}>
            <Return />
            <h2>Suas solicitações</h2>
            <p>Você possui {chromeInfo.length + labInfo.length + speakerInfo.length} solicitações ativas.</p>
            {chromeInfo.length > 0 ? <ScheduleCategory type='chrome' schedules={chromeInfo} /> : ""}
            {labInfo.length > 0 ? <ScheduleCategory type='lab' schedules={labInfo} /> : ""}
            {speakerInfo.length > 0 ? <ScheduleCategory type='speaker' schedules={speakerInfo} /> : ""}
        </div>
    )
}