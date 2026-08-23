import Main from "@/components/Main";
import Project from "@/components/Main/Project";

const pages = [
  "Proporciones",
  "Funciones",
  "Iterador",
  "Calculadora",
  "Admisión",
  "Relog",
  "IA Text Color",
  "Editor de Texto",
  "Laberinto",
  "Lector de archivos",
  "Editar de Imagenes",
  "Galería",
  "Convertidor de archivos",
  "Eficiencia lectora",
  "Horario",
  "ChatBot",
  "Geometría",
  "Zombie 2D",
  "Live.io",
  "Química",
  "Fisica y Cicuitos",
  "Yanaira"
]

export default function Home() {
  return (
    <Main title="Todos los Proyectos" className="cont__flex">
      {pages.map((page, i) => (
        <Project key={page} id={i} title={page} />
      ))}
    </Main>
  );
}
