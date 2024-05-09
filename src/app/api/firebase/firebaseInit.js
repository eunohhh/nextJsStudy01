import admin from 'firebase-admin'
import * as tocken from "../../../../cdapple-study-key.json"

async function init(){
    
    try {
        // 1. ↓ 로그인 된 앱이 없다면
        if(admin.apps.length === 0){
            // 반코파이어베이스로 새로 로그인
            admin.initializeApp({
                credential: admin.credential.cert(tocken, 'cdapple-study'),
                storageBucket: 'cdapple-study.appspot.com'
            });
            console.log('cdapple-study Initialized');

            return admin;

        // 2. ↓ 로그인이 되어 있고(0보다 크다면) 이미 반코파이어베이스 아니라면
        }else if (admin.apps.length > 0 && admin.app().options.credential.projectId !== 'cdapple-study') {
            // 모든 앱 로그아웃하고 반코파이어베이스로 로그인
            await Promise.all(admin.apps.map(app => app.delete()));
            admin.initializeApp({
                credential: admin.credential.cert(tocken, 'cdapple-study'),
                storageBucket: 'cdapple-study.appspot.com'
            });
            console.log('cdapple-study Initialized');

            return admin
        }
        // 3. ↓ 로그인이 되어 있고 그것이 반코파이어베이스 라면
        else if(admin.apps.length > 0 && admin.app().options.credential.projectId === 'cdapple-study'){
            return admin;
        }

    } catch (error) {
        /*
        * We skip the "already exists" message which is
        * not an actual error when we're hot-reloading.
        */
        if (!/already exists/u.test(error.message)) {
            console.error('Firebase admin initialization error', error.stack)
        }

        return error;
    }
}

const adminReady = await init();

export default adminReady;