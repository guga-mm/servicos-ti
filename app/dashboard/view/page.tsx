import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';
import styles from './page.module.css';
import Clickup from './Clickup';
import Rotator from './Rotator';
import Schedules from './Schedules';
import Realtime from '../Realtime';

const pb = new PocketBase(`${process.env.pburl}`);

export default async function View() {
    pb.authStore.loadFromCookie((await cookies()).get('pb_auth')?.value!);

    pb.autoCancellation(false);

    // Schedule data
    let chromes;
    let labs;
    let speakers;
    let chromeScheduleInfo;
    let chromeSchedule;
    let labScheduleInfo;
    let labSchedule;
    let speakerScheduleInfo;
    let speakerSchedule;

    // Clickup data
    let tasks;
    let diary;

    try {

        // Pega os dados Agendamentos

        chromes = await pb.collection('chrome').getFullList(1);
        const labs = await pb.collection('lab').getFullList(1);
        const speakers = await pb.collection('speaker').getFullList(1);

        chromeScheduleInfo = await pb.collection('chrome_schedule_info').getFullList(1, {
            expand: `chrome,grade,class,week_days,user`
        });

        chromeSchedule = await pb.collection('chrome_schedule').getFullList(1, {
            expand: `chrome,schedule_info,schedule_info.grade,schedule_info.class,schedule_info.week_days,schedule_info.user`
        });

        labScheduleInfo = await pb.collection('lab_schedule_info').getFullList(1, {
            expand: `lab,grade,class,week_days,user`
        });

        labSchedule = await pb.collection('lab_schedule').getFullList();

        speakerScheduleInfo = await pb.collection('speaker_schedule_info').getFullList(1, {
            expand: `speaker,grade,class,week_days,user`
        });

        speakerSchedule = await pb.collection('speaker_schedule').getFullList();

    } catch (error) {
        console.log('Error getting Schedule data!', error);
    }

    const url = 'https://api.clickup.com/api/v2/list/901105559393/task';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'pk_75583978_2TF3DEM16IX8LW2CXX368H1M8NYYHD2S'
        }
    };

    const url2 = 'https://api.clickup.com/api/v2/list/901110299584/task';

    // Pega os dados Clickup

    await fetch(url, options).then(res => res.json()).then(json => tasks = json).catch(err => {
        console.log('Error fetching tasks', err);
    });
    await fetch(url2, options).then(res => res.json()).then(json => diary = json).catch(err => {
        console.log('Error fetching diaries', err);
    });

    return (
        <>
            <Rotator className={`${styles.page}`} time={60000}>
                <Schedules data={{ chromes, labs, speakers, chromeScheduleInfo, chromeSchedule, labScheduleInfo, labSchedule, speakerScheduleInfo, speakerSchedule }} />
                <Clickup data={{ tasks, diary }} />
            </Rotator>
            <Realtime />
        </>
    )
}