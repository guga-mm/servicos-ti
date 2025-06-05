import { cookies } from "next/headers";
import Pocketbase from "pocketbase";
import Services from "./Services";
import styles from "./page.module.css";

const pb = new Pocketbase(`${process.env.pburl}`);

export default async function Dashboard() {
  pb.authStore.loadFromCookie((await cookies()).get('pb_auth')?.value!);

  pb.autoCancellation(false);

  // Adquirir dados

  const grades = await pb.collection('grades').getFullList(1, {
    expand: "classes"
  });
  const classes = await pb.collection('classes').getFullList(1);
  const chromes = await pb.collection('chrome').getFullList(1);
  const labs = await pb.collection('lab').getFullList(1);
  const speakers = await pb.collection('speaker').getFullList(1);
  const chromeSchedule = await pb.collection('chrome_schedule').getFullList(1, {
    filter: `returned = false`
  });
  const labSchedule = await pb.collection('lab_schedule').getFullList(1, {
    filter: `returned = false`
  });
  const speakerSchedule = await pb.collection('speaker_schedule').getFullList(1, {
    filter: `returned = false`
  });
  const fixed_classes = await pb.collection('fixed_classes').getFullList(1);

  return (
    <div className={`${styles.page}`}>
      <h2>Escolha o serviço</h2>
      <Services data={{ grades, classes, chromes, labs, speakers, chromeSchedule, labSchedule, speakerSchedule, fixed_classes }} />
    </div>
  );
}
