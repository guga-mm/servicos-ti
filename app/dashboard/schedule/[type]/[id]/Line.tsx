'use client';
import { ChangeEvent } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Pocketbase, { RecordModel } from "pocketbase";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

const pb = new Pocketbase(`${process.env.pburl}`);

export default function Line({ schedule }: { schedule: RecordModel }) {
    const router = useRouter();

    // Marca atrasado
    const setLate = async (e: ChangeEvent) => {
        const update = await pb.collection(schedule.collectionId).update(schedule.id, {
            late: (e.target as HTMLInputElement).checked
        });

        router.refresh();
    }

    // Marca devolvido
    const setReturn = async (e: ChangeEvent) => {
        const update = await pb.collection(schedule.collectionId).update(schedule.id, {
            returned: (e.target as HTMLInputElement).checked
        });

        router.refresh();
    }

    return (
        <tr className={`${styles.schedule}`}>
            <td>{format(schedule.start, "cccc',' d 'de' MMMM 'de' yyyy", { locale: ptBR }).charAt(0).toUpperCase() + format(schedule.start, "cccc',' d 'de' MMMM 'de' yyyy", { locale: ptBR }).slice(1)}</td>
            <td><label className={`${styles.checkbox}`}>
                <span></span>
                Atrasado
                <input type="checkbox" onChange={setLate} defaultChecked={schedule.late} />
            </label></td>
            <td><label className={`${styles.checkbox}`}>
                <span></span>
                Devolvido
                <input type="checkbox" onChange={setReturn} defaultChecked={schedule.returned} />
            </label></td>
        </tr>
    )
}