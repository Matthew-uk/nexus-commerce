import admin from "firebase-admin";
import serviceAccount from "@/firebase.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "next-ecommerce-404013",
      clientEmail:
        "firebase-adminsdk-quqte@next-ecommerce-404013.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQjDSFKGzkI8wf\nlzHxRF/FPDn4MrVC0qYvwSayDUanPU1ogElwHDYaOZZ8ka9/1UTsFOUYBp4QsUjr\nvZUmwYe2PJ6WU8+OD37I/30uALDb2v+FZ8r+l7w+jrscYh4jUGVT/vQgv8XQ0/qi\nF9d6pEhTx75WftU5G68Fj+1R/JCureS1Sp10Q/4tJxvGilIVxSFhsuq4+Rm4bVUZ\n9GUL7Xfyr6sXBZTE1Bcx1BAACV4hZIrpMYDG0FnmP+V39e9/iQ5MKBorSORcv29X\n97Xh5/YtK315/X/ngsP8tqIixRvK3RxCFrvE2sPpwu6XZ0HZC0TDSk3EEiEKBfuR\nNlBFasW3AgMBAAECggEAIGd7V6oUNWS8jbdkBWLu5fTkOwUXYMaIwl3Roek/Ll2a\nSV+5ntJmCQV5X79mqhxyJPlgLtoEYH/ziTHAMFvyNuZMwVCiLPw1DTfpnvwbfvs/\nKImb+JriH0RKnZqUp+m7kjrI0HfhMwAPxHT46y+wpK1M4sq6szDH2BDo5WGIUk50\nrX3v6rAjBxlsSqjBx8UgEIpuQIen/XesAjff0DP8BHRaNnrrtx2FYzYTzj7ekjuo\niuCN58HKaWKpihyCcBW4uBYm9qx9Sal4pvXAgVb2Z/8+XfcNvEZ6Ths2a6s9f6zT\nRnssrz0KGbC+el/XOG7ZDK1aSfj7w9zVZE+mR5ch6QKBgQDqezPYYJcdbmWjhxMj\nWxI8+RHHykbGHfFn4kChFGoELXb6t1Aknr/I4uwHQ2o6EgqSJrpJetqMhyFNshlj\nSrxtk0H9YEXmA+mlz+uOfJCrxK/SDgh0moDAsLsyZ/WPeTqB32J+GX/gWll4vlQK\n0YA6l/AT6rFxA/205ZwLZ3S0mQKBgQDjr7sM8YSJPsnU04tmglAujKRVmiRgL9aQ\nSKDUmD5zhUHW+LATApSfRco9OnhL6GEhKpUyOBYtfgfoBQ+hRVMWWt0PnJjQQzAJ\n4tupHiJS6RbFdxeBYZvJABTQakbCfhUDqYX7899sotYN/24SLjw+l8+euuXFMNNh\nWi/tMOtuzwKBgFTNVgTNehmk0ZGAyoUg7MmscqfFGi+QqLwfcaxQC7+TCdLG9W8p\nEsd+ekpuMT7rQ3N0Gi91BRGJ1ZuZ6+CjKN6gQV93sA/uHlRfjBuuJUxaCBR6CsjR\nD/ugbzNdscu/1k8eESr14e+r/WvTueVnu251gNhTKvVqshj4aaUeN3ERAoGBAJZV\niaPaNDCKjKlBpGFi2Z5irn72792yuHE8AzVb8KBF9FsEiP2ETq17XzVeTd+Q59EG\nVMx7y+jttjq0XMWXCG1SQXP1adDZC/b7Gx5nDzK/RJHNOG/tCveEXjneciopJabt\nX9IkC/mm6r8DUKIgdRa/Fg8wSFYTDv7QlaR/EHRxAoGBAKwz29cZIMJ6YapU2T+r\nVRsTXtUiBaVB1A91a4VbJVkJhrXkThO9vuLyQ+lyJvLWZ9ueJ9Kxqh2gPwq1Daq9\n/XtHAWjCyq79rPYXAgTYLAJ2Tza4sCIgcbJoxgRdvsW0EII1vDRvLAOdRIZMpdte\nWcspvWGY/z1D3iIaK+TdTxJn\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n",
        ),
    }),
    storageBucket: "next-ecommerce-404013.appspot.com",
  });
}

const bucket = admin.storage().bucket();

export { admin, bucket };
