import "../../index.css"
import Row from "./Row";

export default function Marquee() {

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
      "name": "Rasa tidak dipedulikan oleh kekasih",
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
      "name": "Ibu bapa yang terlalu mengongkong",
      "level": "2",
      "category": "main"
    }
  ]
  // situations.forEach(s => {
  //   s.name = "fig7q36 9rct82yn-r7tb 2   x893bcrxn2"
  // });


  return (
    <div>
      <Row stuffs={situations} />
      <Row stuffs={situations} />
      <Row stuffs={situations} />
    </div>
  )
}