function bukaUndangan() {
    document.getElementById("cover").style.display = "none";
    document.getElementById("isi").style.display = "block";

    const musik = document.getElementById("musik");

    if (musik) {
        musik.load();

        musik.play().then(() => {
            console.log("Musik berhasil diputar");
        }).catch((e) => {
            alert("Gagal memutar musik: " + e);
        });
    }
}

// Nama tamu dari URL
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if (nama) {
    document.getElementById("namaTamu").innerText =
        decodeURIComponent(nama.replace(/\+/g, " "));
}

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

// Animasi saat scroll
const animasi = document.querySelectorAll(
    ".welcome,.mempelai,.akad,.lokasi,.story,.gallery"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

animasi.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = ".8s";
    observer.observe(item);
});

// hadiah

function copyRekening(){
    navigator.clipboard.writeText("1234567890");
    alert("Nomor rekening berhasil disalin");
}
// rsvp

document.getElementById("rsvpForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
        nama: document.getElementById("nama").value,
        status: document.getElementById("status").value,
        jumlah: document.getElementById("jumlah").value,
        ucapan: document.getElementById("ucapan").value
    };

    try {

        const response = await fetch("AKfycbyxWTOucDoJ-JyCoHL6hjJ6WrHhYMo95OJa9GsGBP9e1F10-MSFbsN63gVIdIPLkJDp", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8"
            },
            body: JSON.stringify(data)
        });

        const hasil = await response.text();

        console.log(hasil);

        alert("RSVP berhasil dikirim!");

        document.getElementById("rsvpForm").reset();

    } catch (err) {
        console.error(err);
        alert("Gagal mengirim RSVP");
    }

});