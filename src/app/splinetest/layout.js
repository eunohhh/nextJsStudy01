import '@/app/globals.css';

export default function SplinetestLayout({children}){

    return(
        <div style={{height : '100%', minHeight:'calc(var(--vh, 1vh) * 100 - 1px - 3.5rem)', overflowY:"auto", backgroundColor:'beige'}}>
            {children}
        </div>
    )
}