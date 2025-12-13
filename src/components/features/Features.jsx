import '../../index.css'
import CardStack from './CardStack';

export default function Features() {
    const stack = [
        { id: 1, content: "Macam Reddit + Threads + Facebook, tapi lebih ringkas dan diutamakan untuk Bahasa Melayu dan orang Malaysia, sambil mengekalkan fleksibiliti Bahasa Inggeris.", imageName: "chair.jpg" },
        { id: 2, content: "Kongsi luahan anda di sosial media. Kebebasan 100% untuk sembunyikan perincian cerita, sebanyak mana yang anda mahu.", imageName: "rainbow.jpg" },
        { id: 3, content: "Carta dan kedudukan situasi terbanyak mengikut demografi dikemaskini setiap minggu. Lihat apa yang lelaki, perempuan, belia, pelajar atau orang setiap negeri renungkan.", imageName: "butterfly.jpg" },
        { id: 4, content: "Sumber kod laman web ini adalah terbuka dan umum. Tiada data diambil secara terang-terangan atau di latar belakang tanpa pengetahuan dan kebenaran anda.", imageName: "space.jpg" },
        { id: 5, content: "Projek ini adalah hobi berskala kecil semata-mata. Samalahkita direka atas dasar minat terhadap Bahasa Melayu dan mereka yang memerlukan bantuan merangkumi topik emosi, hubungan sosial dan pengalaman membesar tetapi kurang memahami kandungan Internet yang diselimuti Bahasa Inggeris. Admin berharap anda jumpa sesuatu yang membantu disini walaupun sekecil zarah.", imageName: "pj.jpg" }
    ];

    return (
        <div className='grid grid-col justify-center mt-10'>
            <div className='grid gird-col text-center'>
                {/* <span className='text-lg'>Cara Guna</span> */}
                {/* <span className='text-gray-500 text-sm'>Klik kad paling depan untuk gerak</span> */}
            </div>
            <CardStack stack={stack} />
        </div>
    );
}