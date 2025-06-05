'use client';

import { useState } from "react";
import styles from "./page.module.css";
import Pocketbase, { RecordModel } from "pocketbase";
import { useRouter } from "next/navigation";

const pb = new Pocketbase(`${process.env.pburl}`);

export default function CreateEquipment({type}: {type: string}) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [occupied, setOccupied] = useState(false);

    const create = async () => {
        const result = await pb.collection(type).create({
            label: name,
            occupied: occupied
        });

        setName('');
        setOccupied(false);
        router.refresh();
    }

    return (
        <tr className={`${styles.create}`}>
            <td><input className={`${styles.input}`} placeholder="Novo equipamento" onChange={(e) => setName(e.target.value)} type="text" defaultValue={name} /></td>
            <td>Nenhum</td>
            <td>Nenhum</td>
            <td>Disponível</td>
            <td>
                <label className={`${styles.checkbox}`}>
                    <span></span>
                    Ocupado
                    <input type="checkbox" onChange={(e) => setOccupied(e.target.checked)} defaultChecked={occupied} />
                </label>
            </td>
            <td>
                <button className={`${styles.action}`}> Adicionar </button>
            </td>
        </tr>
    )
}