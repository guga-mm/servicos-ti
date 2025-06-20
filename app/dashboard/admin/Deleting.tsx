'use client';
import Pocketbase, { RecordModel } from "pocketbase";
import styles from "./popup.module.css";
import { useRouter } from "next/navigation";

const pb = new Pocketbase(`${process.env.pburl}`);

export default function Deleting({ id, collection, schedules, setShown }: { id: string, collection: string, schedules: RecordModel[], setShown: (shown: boolean) => void }) {
    const router = useRouter();

    const deleteAction = async () => {
        const delBatch = pb.createBatch();
        schedules.filter(s => s.schedule_info == id).forEach(s => delBatch.collection(s.collectionId).delete(s.id));
        delBatch.collection(collection).delete(id);
        const result = await delBatch.send();
        router.refresh();
        setShown(false);
    }

    return (
        <div className={`${styles.popup}`}>
            <div className={`${styles.message}`}>
                <h3>Tem certeza que deseja deletar isso?</h3>
                <p>Todos os dados relacionados a esse item serão apagados.</p>
                <p>Não é possível reverter essa operação!</p>
                <div className={`${styles.buttons}`}>
                    <button className={`${styles.button} ${styles.delete}`} onClick={deleteAction}>Confirmar</button>
                    <button className={`${styles.button}`} onClick={() => setShown(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}