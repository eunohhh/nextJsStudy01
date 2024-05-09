'use client'
import styles from '@/app/toontest/page.module.css'
import React, { useState } from 'react';

export default function ToonTestComponent(){
    const [toggle, setToggle] = useState(styles.cardcontainer);

    const handleClick = () => {
        // toggle 상태에 따라 클래스를 변경
        if (toggle === styles.cardcontainer) {
            setToggle(`${styles.cardcontainer} ${styles.expanded}`);
        } else {
            return;
        }
    };

    return(
        <div onClick={handleClick} className={toggle}>
            <div className={styles.card} style={{backgroundColor: 'red'}}></div>
            <div className={styles.card} style={{backgroundColor: 'orange'}}></div>
            <div className={styles.card} style={{backgroundColor: 'yellow'}}></div>
            <div className={styles.card} style={{backgroundColor: 'green'}}></div>
            <div className={styles.card} style={{backgroundColor: 'blue'}}></div>
            <div className={styles.card} style={{backgroundColor: 'purple'}}></div>
            <div className={styles.card} style={{backgroundColor: 'magenta'}}></div>
            <div className={styles.card} style={{backgroundColor: 'black'}}></div>
            <div className={styles.card} style={{backgroundColor: 'saddlebrown'}}></div>
            <div className={styles.card} style={{backgroundColor: 'skyblue'}}></div>

        </div>
    )
}