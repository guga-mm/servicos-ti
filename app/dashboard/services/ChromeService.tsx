'use client';

import DateRange from "@/app/DateRange";
import Pocketbase, { RecordModel } from "pocketbase";
import { useState, FormEvent, useEffect } from "react";
import DateComponent from "../components/FormDateComponent";
import MultiSelect from "../components/MultiSelectComponent";
import Select from "../components/SelectComponent";
import scheduleDateCheck from "../ScheduleDateCheck";
import validDate from "../ValidDate";
import Cookies from "js-cookie";
import styles from "./service.module.css";
import components from "../components/components.module.css";
import LoaderPopup from "@/app/LoaderPopup";
import SuccessPopup from "../SuccessPopup";
import ErrorPopup from "../ErrorPopup";
import { useRouter } from "next/navigation";

const pb = new Pocketbase(`${process.env.pburl}`);

export default function ChromeService({ data }: { data: { grades: RecordModel[], classes: RecordModel[], chromes: RecordModel[], schedule: RecordModel[] } }) {
    const [date, setDate] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [repeat, setRepeat] = useState('norepeat');
    const w: string[] = [];
    const [weekDays, setWeekDays] = useState(w);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [grade, setGrade] = useState('');
    const [gradeClass, setGradeClass] = useState('');
    const [obs, setObs] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    let chromesCheck: { label: any; value: string; disabled: boolean; }[] = [];

    // Cria checkboxes de chrome 
    data.chromes.forEach(c => {
        const item = {
            label: c.label,
            value: c.id,
            disabled: c.occupied || data.schedule.some(s => scheduleDateCheck(new Date(Date.parse(date)), new Date(Date.parse(dateEnd)), startTime, endTime, repeat, weekDays, s, c.id, 'chrome')) || (startTime == '' || endTime == '')
        }
        chromesCheck.push(item);
    });

    // Carrega sessão dos cookies
    pb.authStore.loadFromCookie(Cookies.get('pb_auth')!);
    pb.autoCancellation(false);

    const router = useRouter();

    // Atualiza página quando há alterações

    useEffect(() => {
        pb.collection('chrome_schedule_info').subscribe('*', (e) => {
            router.refresh();
        });
        return () => {
            pb.collection('chrome_schedule_info').unsubscribe('*');
            return;
        };
    }, [router]);

    useEffect(() => {
        pb.collection('speaker_schedule_info').subscribe('*', (e) => {
            router.refresh();
        });
        return () => {
            pb.collection('speaker_schedule_info').unsubscribe('*');
            return;
        };
    }, [router]);

    useEffect(() => {
        pb.collection('lab_schedule_info').subscribe('*', (e) => {
            router.refresh();
        });
        return () => {
            pb.collection('lab_schedule_info').unsubscribe('*');
            return;
        };
    }, [router]);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let selected: string[] = [];
        let children = document.getElementById('checkboxes')?.querySelectorAll('input');

        // Adiciona os checkboxes selecionados em selected
        for (let i = 0; i < children?.length!; i++) {
            const c = children?.item(i);
            if (c instanceof HTMLInputElement) {
                if (c.checked && !(c as HTMLInputElement).disabled) selected.push((c as HTMLElement).id);
            }
        }

        // Erro de data invalida
        if (!validDate(new Date(Date.parse(date)), repeat, new Date(Date.parse(dateEnd)), weekDays)) {
            setErrorCode(1);
            setError(true);
            return;
        };

        const start = new Date(Date.parse(date));
        const end = new Date(Date.parse(dateEnd) + 86400000);

        // Erro de chromes não selecionados
        if (selected.length <= 0) {
            setErrorCode(3);
            setError(true);
            return;
        }

        const start_time = new Date(Date.parse(`${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}T${startTime}`));
        const end_time = new Date(Date.parse(`${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}-${start.getDate().toString().padStart(2, '0')}T${endTime}`));

        // Erro de horário inválido
        if (start_time >= end_time) {
            setErrorCode(2);
            setError(true);
            return;
        }

        // Erro de agendamento precoce
        if (start_time < new Date(Date.now() + 3000000) && selected.length > 5) {
            setErrorCode(4);
            setError(true);
            return;
        }

        setLoading(true);

        // Cria agendamento base
        const info = await pb.collection('chrome_schedule_info').create({
            grade: grade,
            class: gradeClass,
            obs: obs,
            user: pb.authStore.record?.id,
            start: date,
            end: dateEnd,
            start_time: startTime,
            end_time: endTime,
            repeat: repeat,
            week_days: weekDays,
            chrome: selected
        });

        let scheduledDays: DateRange[] = [];

        // Calcula agendamentos relacionados

        if (repeat == 'norepeat') {
            scheduledDays.push(new DateRange(start, Number(startTime.split(':')[0]), Number(startTime.split(':')[1]),
                Number(endTime.split(':')[0]), Number(endTime.split(':')[1])));
        }

        if (repeat == 'everyday') {
            for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                scheduledDays.push(new DateRange(d, Number(startTime.split(':')[0]), Number(startTime.split(':')[1]),
                    Number(endTime.split(':')[0]), Number(endTime.split(':')[1])));
            }
        }

        if (repeat == 'weekly') {
            for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                if (weekDays.some(w => Number(w) == d.getDay())) scheduledDays.push(new DateRange(d, Number(startTime.split(':')[0]),
                    Number(startTime.split(':')[1]), Number(endTime.split(':')[0]), Number(endTime.split(':')[1])));
            }
        }

        const batch = pb.createBatch();

        // Adiciona os agendamentos relacionados
        scheduledDays.forEach(range => {
            batch.collection('chrome_schedule').create({
                schedule_info: info.id,
                start: range.start,
                end: range.end,
                chrome: selected,
                returned: false
            });
        });

        const schedules = await batch.send();

        // Roda webhook do make
        fetch(`https://hook.us2.make.com/lt688h3jfsfllqn25i92p3yirvcfcd1g?id=${info.id}&collection=chrome`);

        setLoading(false);
        setSuccess(true);

        setDate('');
        setDateEnd('');
        setRepeat('norepeat');
        const nw: string[] = [];
        setWeekDays(nw);
        setStartTime('');
        setEndTime('');
        setGrade('');
        setGradeClass('');
        const nsel: string[] = [];
        setObs('');

        (e.target as HTMLFormElement).reset();
    }

    return (
        <form onSubmit={(e) => submit(e)} className={`${styles.form}`}>
            {loading ? <LoaderPopup /> : ''}
            {success ? <SuccessPopup toggle={setSuccess} /> : ''}
            {error ? <ErrorPopup toggle={setError} code={errorCode} /> : ''}
            <h3>Agendar Chromebooks</h3>
            <DateComponent
                onChange={(dateStart, dateEnd, repeat, weekDays) => {
                    setDate(dateStart);
                    setDateEnd(dateEnd);
                    setRepeat(repeat);
                    setWeekDays(weekDays);
                }} />
            <div className={`${styles.time}`}>
                <label className={`${components.input}`}>
                    Empréstimo
                    <input type="time"
                        onChange={(e) => setStartTime(e.target.value)}
                        required />
                </label>
                <label className={`${components.input}`}>
                    Devolução
                    <input type="time"
                        onChange={(e) => setEndTime(e.target.value)}
                        required />
                </label>
            </div>
            <div className={`${styles.time}`}>
                <label className={`${components.input}`}>
                    Série
                    <Select items={data.grades.map(g => {
                        return {
                            label: g.label,
                            value: g.id
                        }
                    })} onClick={(value) => { value && data.grades.some(g => g.id == value) ? setGrade(value) : setGrade('') }} required={true} />
                </label>
                {grade != '' && data.grades.find(g => g.id == grade)!.classes.length > 0 ? <label className={`${components.input}`}>
                    Turma
                    <Select items={data.grades.find(g => g.id == grade)?.expand?.classes.map((c: any) => {
                        return {
                            label: c.label,
                            value: c.id
                        };
                    })} onClick={(value) => value ? setGradeClass(value) : setGradeClass('')} required={true} />
                </label> : null}
            </div>
            <div className={`${styles.chromes}`}>
                <p>Selecione os Chromes para empréstimo</p>
                <MultiSelect name={"chromebooks"} items={chromesCheck} />
            </div>
            <input type="text" placeholder="Observação" className={`${styles.input}`} onChange={(e) => setObs(e.target.value ? e.target.value : "")} />
            <button className={`${styles.button}`} type="submit">Agendar</button>
        </form>
    )
}