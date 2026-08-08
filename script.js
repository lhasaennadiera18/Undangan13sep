/* =========================================================
   SCRIPT.JS FINAL — LASAN & MAYA
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Kunci scroll saat cover masih terbuka
    document.body.classList.add("lock-scroll");

});


/* =========================================================
   BUKA UNDANGAN
========================================================= */

function bukaUndangan() {

    const cover = document.getElementById("cover");
    const isi = document.getElementById("isi");
    const musik = document.getElementById("musik");

    // Pastikan elemen tersedia
    if (!cover || !isi) {
        console.error("Cover atau isi tidak ditemukan.");
        return;
    }

    // Buka scroll
    document.body.classList.remove("lock-scroll");

    // Tandai undangan sudah dibuka
    document.body.classList.add("undangan-dibuka");

    // Putar musik
    if (musik) {
        musik.volume = 0.7;

        const playPromise = musik.play();

        if (playPromise !== undefined) {
            playPromise.catch(function (error) {
                console.log("Musik belum dapat diputar:", error);
            });
        }
    }

    // Scroll menuju isi
    setTimeout(function () {

        isi.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =========================================================
   CEGAH SCROLL SAAT COVER
========================================================= */

document.addEventListener("wheel", function (e) {

    if (document.body.classList.contains("lock-scroll")) {
        e.preventDefault();
    }

}, { passive: false });


document.addEventListener("touchmove", function (e) {

    if (document.body.classList.contains("lock-scroll")) {
        e.preventDefault();
    }

}, { passive: false });


/* =========================================================
   CEGAH TOMBOL PANAH / SPACE / PAGE DOWN
========================================================= */

document.addEventListener("keydown", function (e) {

    if (!document.body.classList.contains("lock-scroll")) {
        return;
    }

    const tombolScroll = [
        "ArrowUp",
        "ArrowDown",
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

// Countdown
const target = new Date("2026-09-13T07:00:00+07:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const selisih = target - now;

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    document.getElementById("hari").innerHTML = hari;
    document.getElementById("jam").innerHTML = jam;
    document.getElementById("menit").innerHTML = menit;
    document.getElementById("detik").innerHTML = detik;
}, 1000);