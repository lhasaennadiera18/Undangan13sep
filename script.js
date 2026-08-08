/* =========================================================
   SCRIPT.JS FINAL — LASAN & MAYA
========================================================= */


/* =========================================================
   1. SAAT HALAMAN DIBUKA
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Kunci scroll sebelum tombol Buka Undangan ditekan
    document.body.classList.add("lock-scroll");

    // Tampilkan nama tamu dari URL
    tampilkanNamaTamu();

    // Jalankan countdown
    mulaiCountdown();

});


/* =========================================================
   2. NAMA TAMU DARI URL
========================================================= */

function tampilkanNamaTamu() {

    const namaTamu = document.getElementById("namaTamu");

    if (!namaTamu) return;

    const params = new URLSearchParams(window.location.search);

    const nama = params.get("to");

    if (nama && nama.trim() !== "") {

        namaTamu.textContent = nama.trim();

    } else {

        namaTamu.textContent = "Tamu Undangan";

    }

}


/* =========================================================
   3. BUKA UNDANGAN
========================================================= */

function bukaUndangan() {

    const cover = document.getElementById("cover");
    const isi = document.getElementById("isi");
    const musik = document.getElementById("musik");

    if (!cover || !isi) {

        console.error("Cover atau isi tidak ditemukan.");

        return;

    }


    /* -----------------------------------------
       BUKA KUNCI SCROLL
    ----------------------------------------- */

    document.body.classList.remove("lock-scroll");

    document.body.classList.add("undangan-dibuka");


    /* -----------------------------------------
       PUTAR MUSIK
    ----------------------------------------- */

    if (musik) {

        musik.volume = 0.7;

        const playPromise = musik.play();

        if (playPromise !== undefined) {

            playPromise.catch(function (error) {

                console.log(
                    "Musik tidak dapat diputar:",
                    error
                );

            });

        }

    }


    /* -----------------------------------------
       PINDAH KE HALAMAN ISI
    ----------------------------------------- */

    setTimeout(function () {

        isi.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}


/* =========================================================
   4. CEGAH SCROLL SAAT COVER
========================================================= */

document.addEventListener("wheel", function (e) {

    if (
        document.body.classList.contains("lock-scroll")
    ) {

        e.preventDefault();

    }

}, {
    passive: false
});


/* =========================================================
   5. CEGAH TOUCH SCROLL HP
========================================================= */

document.addEventListener("touchmove", function (e) {

    if (
        document.body.classList.contains("lock-scroll")
    ) {

        e.preventDefault();

    }

}, {
    passive: false
});


/* =========================================================
   6. CEGAH KEYBOARD SCROLL
========================================================= */

document.addEventListener("keydown", function (e) {

    if (
        !document.body.classList.contains("lock-scroll")
    ) {

        return;

    }

    const tombolScroll = [

        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " "

    ];


    if (tombolScroll.includes(e.key)) {

        e.preventDefault();

    }

});


/* =========================================================
   7. COUNTDOWN
========================================================= */

function mulaiCountdown() {

    const target =
        new Date(
            "2026-09-13T07:00:00+07:00"
        ).getTime();


    function updateCountdown() {

        const sekarang =
            new Date().getTime();

        const selisih =
            target - sekarang;


        const hariElement =
            document.getElementById("hari");

        const jamElement =
            document.getElementById("jam");

        const menitElement =
            document.getElementById("menit");

        const detikElement =
            document.getElementById("detik");


        if (
            !hariElement ||
            !jamElement ||
            !menitElement ||
            !detikElement
        ) {

            return;

        }


        /* -----------------------------------------
           JIKA WAKTU SUDAH LEWAT
        ----------------------------------------- */

        if (selisih <= 0) {

            hariElement.textContent = "00";
            jamElement.textContent = "00";
            menitElement.textContent = "00";
            detikElement.textContent = "00";

            return;

        }


        /* -----------------------------------------
           HITUNG WAKTU
        ----------------------------------------- */

        const hari =
            Math.floor(
                selisih /
                (1000 * 60 * 60 * 24)
            );


        const jam =
            Math.floor(
                (selisih %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        const menit =
            Math.floor(
                (selisih %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );


        const detik =
            Math.floor(
                (selisih %
                    (1000 * 60))
                /
                1000
            );


        /* -----------------------------------------
           TAMPILKAN
        ----------------------------------------- */

        hariElement.textContent =
            String(hari).padStart(2, "0");

        jamElement.textContent =
            String(jam).padStart(2, "0");

        menitElement.textContent =
            String(menit).padStart(2, "0");

        detikElement.textContent =
            String(detik).padStart(2, "0");

    }


    // Jalankan langsung
    updateCountdown();


    // Update setiap detik
    setInterval(
        updateCountdown,
        1000
    );

}


/* =========================================================
   8. SALIN REKENING LASAN
========================================================= */

function copyRekening1() {

    const rekening = "0131794061";

    navigator.clipboard.writeText(rekening)
        .then(function () {

            alert(
                "Nomor rekening Lasan berhasil disalin."
            );

        })
        .catch(function () {

            alert(
                "Gagal menyalin nomor rekening."
            );

        });

}


/* =========================================================
   9. SALIN REKENING MAYA
========================================================= */

function copyRekening2() {

    const rekening = "3024375551";

    navigator.clipboard.writeText(rekening)
        .then(function () {

            alert(
                "Nomor rekening Maya berhasil disalin."
            );

        })
        .catch(function () {

            alert(
                "Gagal menyalin nomor rekening."
            );

        });

}