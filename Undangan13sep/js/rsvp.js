import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const form = document.getElementById("rsvpForm");
const listUcapan = document.getElementById("listUcapan");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        await addDoc(collection(db, "rsvp"), {
            nama: document.getElementById("nama").value,
            status: document.getElementById("status").value,
            jumlah: Number(document.getElementById("jumlah").value),
            ucapan: document.getElementById("ucapan").value,
            waktu: new Date()
        });

        alert("RSVP berhasil dikirim");

        form.reset();

        loadUcapan();

    } catch (err) {

        console.error(err);

        alert("Gagal mengirim RSVP");

    }
});

async function loadUcapan() {

    listUcapan.innerHTML = "";

    const q = query(
        collection(db, "rsvp"),
        orderBy("waktu", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((item) => {

        const data = item.data();

        listUcapan.innerHTML += `
        <div class="ucapan-item">
            <h4>${data.nama}</h4>
            <small>${data.status} • ${data.jumlah} tamu</small>
            <p>${data.ucapan}</p>
           
         
        </div>
        `;

    });

}

window.hapusRSVP = async function(id){

    const yakin = confirm("Hapus RSVP ini?");

    if(!yakin) return;

    try{

        await deleteDoc(doc(db,"rsvp",id));

        loadUcapan();

    }catch(err){

        console.error(err);

        alert("Gagal menghapus data");

    }

}

loadUcapan();
// tombol button di bawah data . ucapan   <button class="hapus-btn"
               // onclick="hapusRSVP('${item.id}')">
              //  🗑 Hapus
         //   </button>
         // hapus aemuat tanda miring