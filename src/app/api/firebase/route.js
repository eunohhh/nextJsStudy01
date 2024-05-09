import admin from "./firebaseInit";

/** new ways ! */
export async function GET(req) {

    try {

        const firebase = admin.firestore();

        const collection = await firebase.collection('plan').get();

        const data = collection.docs.map((doc) => doc.data());

        const responseObject = {
            plan : data,
        }

        return Response.json(responseObject, {status :200});

    } catch(error){
        console.log(error)
        return Response.json({ message: "An error occurred"}, {status: 400});
    }

}