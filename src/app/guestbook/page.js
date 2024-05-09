import styles from "@/app/guestbook/page.module.css";
import BrushCanvas from "./brushcanvas";

export default function GuestBookPage(){

    return (
        <>
            <div className={styles.drawer}>

                <BrushCanvas />

            </div>

        </>
    )
}