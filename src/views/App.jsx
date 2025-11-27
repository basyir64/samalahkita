import AnimatedScroll from "../components/animated-scroll/AnimatedScroll"

export default function App() {
    const situations = [
        {
            "id": 1,
            "name": "Kucing meninggal",
            "level": "2",
            "category": "main"
        },
        {
            "id": 2,
            "name": "Dikutuk di tempat kerja",
            "level": "2",
            "category": "main"
        },
        {
            "id": 3,
            "name": "Kewangan teruk dan tidak bersemangat untuk bekerja",
            "level": "2",
            "category": "main"
        },
        {
            "id": 4,
            "name": "Saya ada adik beradik yang kesemuanya berlainan jantina dari saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 5,
            "name": "Kejiranan rasa tak selamat",
            "level": "2",
            "category": "main"
        },
        {
            "id": 6,
            "name": "Saya baru dibuang kerja",
            "level": "2",
            "category": "main"
        },
        {
            "id": 7,
            "name": "Saya rasa tidak dipedulikan oleh kekasih saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 8,
            "name": "Crush tolak cinta",
            "level": "2",
            "category": "main"
        },
        {
            "id": 9,
            "name": "Adakah aku terlalu sensitif?",
            "level": "2",
            "category": "main"
        },
        {
            "id": 10,
            "name": "Saya tak pernah menderma darah kerana takut jarum",
            "level": "2",
            "category": "main"
        },
        {
            "id": 11,
            "name": "Saya rasa 'depressed' tapi diagnosis mengatakan sebaliknya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 12,
            "name": "Saya selalu dikelilingi orang yang tak bersependapat",
            "level": "2",
            "category": "main"
        },
        {
            "id": 13,
            "name": "Saya ada 'imposter syndrome'",
            "level": "2",
            "category": "main"
        },
        {
            "id": 14,
            "name": "Saya tak tahu saya 'introvert' atau kurang keyakinan diri",
            "level": "2",
            "category": "main"
        },
        {
            "id": 15,
            "name": "Saya ada ketagihan merokok",
            "level": "2",
            "category": "main"
        },
        {
            "id": 16,
            "name": "Rakan sekerja saya tak nak bekerjasama dan saya tak tahu cara memujuk dia",
            "level": "2",
            "category": "main"
        },
        {
            "id": 17,
            "name": "Saya 'cope' dengan perasaan negatif melalui media untuk mengelakkan 'overthinking'",
            "level": "2",
            "category": "main"
        },
        {
            "id": 18,
            "name": "Kawan-kawan tak faham situasi saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 19,
            "name": "Ibu saya menghalang hubungan dengan kekasih saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 20,
            "name": "Saya rasa 'burn-out' disebabkan kerja",
            "level": "2",
            "category": "main"
        },
        {
            "id": 21,
            "name": "Saya rasa saya terlalu ikutkan 'trend' dan akibatnya kewangan saya terjejas",
            "level": "2",
            "category": "main"
        },
        {
            "id": 22,
            "name": "Saya suka seni tapi saya tak kreatif",
            "level": "2",
            "category": "main"
        },
        {
            "id": 23,
            "name": "Saya suka sains tapi saya tak suka membaca",
            "level": "2",
            "category": "main"
        },
        {
            "id": 24,
            "name": "Saya selalu ambil gambar kawan dengan cantik tapi mereka ambil buruk",
            "level": "2",
            "category": "main"
        },
        {
            "id": 25,
            "name": "Kawan rapat saya di tempat kerja dah nak berhenti",
            "level": "2",
            "category": "main"
        },
        {
            "id": 26,
            "name": "Saya rindu kawan-kawan sekolah saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 27,
            "name": "Saya suka menyanyi tapi suara saya tak sedap",
            "level": "2",
            "category": "main"
        },
        {
            "id": 28,
            "name": "Kawan saya tidak menutup aurat",
            "level": "2",
            "category": "main"
        },
        {
            "id": 29,
            "name": "Saya rasa ketinggalan dari rakan sebaya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 30,
            "name": "Saya susah nak belajar sebab silibus dalam Bahasa Inggeris",
            "level": "2",
            "category": "main"
        },
        {
            "id": 31,
            "name": "Saya terlantar sakit di hospital dan tiada siapa datang melawat saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 32,
            "name": "Saya belajar di negeri orang dan saya merindui kampung halaman saya",
            "level": "2",
            "category": "main"
        },
        {
            "id": 33,
            "name": "Saya rindu kucing saya dekat rumah",
            "level": "2",
            "category": "main"
        },
        {
            "id": 34,
            "name": "Ibu bapa saya membuatkan saya rasa sedih",
            "level": "2",
            "category": "main"
        },
        {
            "id": 35,
            "name": "Saya rasa mengantuk tapi saya susah nak tidur",
            "level": "2",
            "category": "main"
        },
        {
            "id": 36,
            "name": "Saya nak beli sesuatu tapi bajet saya belum mencukupi",
            "level": "2",
            "category": "main"
        },
        {
            "id": 37,
            "name": "Ibu saya baru meninggal dunia",
            "level": "2",
            "category": "main"
        },
        {
            "id": 38,
            "name": "Ayah saya baru meninggal dunia",
            "level": "2",
            "category": "main"
        },
        {
            "id": 39,
            "name": "Atuk saya baru meninggal dunia",
            "level": "2",
            "category": "main"
        },
        {
            "id": 40,
            "name": "Nenek saya baru meninggal dunia",
            "level": "2",
            "category": "main"
        }
    ]
    return (
        <>
            <AnimatedScroll stuffs={situations} />
        </>
    )
}