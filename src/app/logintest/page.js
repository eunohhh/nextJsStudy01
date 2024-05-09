import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route";

import PopupLoginBtn from "./_component/popuploginbtn";

export default async function LoginPage(){

    const session = await getServerSession(authOptions);

    session ?? console.log(session)

    return(
        <PopupLoginBtn serverSession={session}/>
    )
}