/* =========================================================
   ADMIN RSVP — LASAN & MAYA
   Firebase Firestore + Firebase Authentication
========================================================= */

import { db } from "./js/firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    getApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";



/* =========================================================
   FIREBASE AUTH
========================================================= */

const app = getApp();

const auth = getAuth(app);



/* =========================================================
   ELEMENT
========================================================= */

const loginPage =
    document.getElementById("loginPage");

const adminPage =
    document.getElementById("adminPage");

const loginForm =
    document.getElementById("loginForm");

const loginError =
    document.getElementById("loginError");

const logoutBtn =
    document.getElementById("logoutBtn");

const refreshBtn =
    document.getElementById("refreshBtn");

const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

const rsvpTable =
    document.getElementById("rsvpTable");

const loading =
    document.getElementById("loading");

const emptyData =
    document.getElementById("emptyData");



/* =========================================================
   DATA RSVP
========================================================= */

let semuaRSVP = [];



/* =========================================================
   CEK LOGIN
========================================================= */

onAuthStateChanged(auth, (user) => {

    if (user) {

        loginPage.style.display = "none";

        adminPage.style.display = "block";

        loadRSVP();

    } else {

        loginPage.style.display = "flex";

        adminPage.style.display = "none";

    }

});



/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function (e) {

        e.preventDefault();

        loginError.textContent = "";

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        } catch (error) {

            console.error(error);

            loginError.textContent =
                "Email atau password salah.";

        }

    }
);



/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener(
    "click",
    async function () {

        const yakin =
            confirm("Yakin ingin keluar dari Admin?");

        if (!yakin) return;

        try {

            await signOut(auth);

        } catch (error) {

            console.error(error);

        }

    }
);



/* =========================================================
   LOAD RSVP
========================================================= */

async function loadRSVP() {

    loading.style.display = "block";

    emptyData.style.display = "none";

    rsvpTable.innerHTML = "";


    try {

        const q = query(
            collection(db, "rsvp"),
            orderBy("waktu", "desc")
        );


        const snapshot =
            await getDocs(q);


        semuaRSVP = [];


        snapshot.forEach((item) => {

            semuaRSVP.push({

                id: item.id,

                ...item.data()

            });

        });


        updateStatistik();

        tampilkanRSVP();


    } catch (error) {

        console.error(
            "Gagal mengambil RSVP:",
            error
        );


        alert(
            "Gagal mengambil data RSVP."
        );

    }


    loading.style.display = "none";

}



/* =========================================================
   TAMPILKAN RSVP
========================================================= */

function tampilkanRSVP() {

    rsvpTable.innerHTML = "";


    const keyword =
        searchInput.value
            .toLowerCase()
            .trim();


    const filter =
        filterStatus.value;


    const dataFilter =
        semuaRSVP.filter((item) => {

            const nama =
                String(item.nama || "")
                    .toLowerCase();


            const cocokNama =
                nama.includes(keyword);


            const cocokStatus =
                filter === "semua"
                ||
                item.status === filter;


            return (
                cocokNama &&
                cocokStatus
            );

        });


    document.getElementById(
        "jumlahData"
    ).textContent =
        `${dataFilter.length} data ditampilkan`;


    if (dataFilter.length === 0) {

        emptyData.style.display = "block";

        return;

    }


    emptyData.style.display = "none";


    dataFilter.forEach(
        (item, index) => {

            const tr =
                document.createElement("tr");


            /* NO */

            const tdNo =
                document.createElement("td");

            tdNo.textContent =
                index + 1;


            /* NAMA */

            const tdNama =
                document.createElement("td");

            tdNama.textContent =
                item.nama || "-";


            /* STATUS */

            const tdStatus =
                document.createElement("td");


            const status =
                document.createElement("span");


            status.classList.add(
                "status"
            );


            if (item.status === "Hadir") {

                status.classList.add(
                    "status-hadir"
                );

                status.textContent =
                    "✓ Hadir";

            } else {

                status.classList.add(
                    "status-tidak"
                );

                status.textContent =
                    "✕ Tidak Hadir";

            }


            tdStatus.appendChild(
                status
            );



            /* JUMLAH */

            const tdJumlah =
                document.createElement("td");

            tdJumlah.textContent =
                `${item.jumlah || 0} tamu`;



            /* UCAPAN */

            const tdUcapan =
                document.createElement("td");

            tdUcapan.classList.add(
                "ucapan-cell"
            );

            tdUcapan.textContent =
                item.ucapan || "-";



            /* WAKTU */

            const tdWaktu =
                document.createElement("td");

            tdWaktu.textContent =
                formatWaktu(item.waktu);



            /* AKSI */

            const tdAksi =
                document.createElement("td");


            const tombolHapus =
                document.createElement("button");


            tombolHapus.className =
                "btn-hapus";


            tombolHapus.textContent =
                "🗑️ Hapus";


            tombolHapus.addEventListener(
                "click",
                () => hapusRSVP(item.id)
            );


            tdAksi.appendChild(
                tombolHapus
            );



            /* MASUKKAN KE ROW */

            tr.appendChild(tdNo);

            tr.appendChild(tdNama);

            tr.appendChild(tdStatus);

            tr.appendChild(tdJumlah);

            tr.appendChild(tdUcapan);

            tr.appendChild(tdWaktu);

            tr.appendChild(tdAksi);


            rsvpTable.appendChild(tr);

        }
    );

}



/* =========================================================
   FORMAT WAKTU
========================================================= */

function formatWaktu(timestamp) {

    if (!timestamp) {

        return "-";

    }


    try {

        const date =
            timestamp.toDate
            ? timestamp.toDate()
            : new Date(timestamp);


        return date.toLocaleString(
            "id-ID",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    } catch (error) {

        return "-";

    }

}



/* =========================================================
   HAPUS RSVP
========================================================= */

async function hapusRSVP(id) {

    const data =
        semuaRSVP.find(
            item => item.id === id
        );


    const nama =
        data
            ? data.nama
            : "tamu ini";


    const yakin =
        confirm(
            `Hapus RSVP dari ${nama}?\n\nData yang dihapus tidak dapat dikembalikan.`
        );


    if (!yakin) {

        return;

    }


    try {

        await deleteDoc(
            doc(db, "rsvp", id)
        );


        alert(
            "RSVP berhasil dihapus."
        );


        await loadRSVP();


    } catch (error) {

        console.error(
            "Gagal menghapus RSVP:",
            error
        );


        alert(
            "Gagal menghapus RSVP.\n\nPastikan akun admin memiliki izin untuk menghapus data."
        );

    }

}



/* =========================================================
   STATISTIK
========================================================= */

function updateStatistik() {

    const total =
        semuaRSVP.length;


    const hadir =
        semuaRSVP.filter(
            item =>
                item.status === "Hadir"
        ).length;


    const tidakHadir =
        semuaRSVP.filter(
            item =>
                item.status === "Tidak Hadir"
        ).length;


    const totalTamu =
        semuaRSVP.reduce(
            (total, item) => {

                return total +
                    Number(item.jumlah || 0);

            },
            0
        );


    document.getElementById(
        "totalRSVP"
    ).textContent = total;


    document.getElementById(
        "totalHadir"
    ).textContent = hadir;


    document.getElementById(
        "totalTidakHadir"
    ).textContent =
        tidakHadir;


    document.getElementById(
        "totalTamu"
    ).textContent =
        totalTamu;

}



/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    tampilkanRSVP
);



/* =========================================================
   FILTER
========================================================= */

filterStatus.addEventListener(
    "change",
    tampilkanRSVP
);



/* =========================================================
   REFRESH
========================================================= */

refreshBtn.addEventListener(
    "click",
    loadRSVP
);