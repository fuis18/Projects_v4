"use client";
import Main from "@/app/components/Main";
import "./css.css";
import ClockPicker from './ClockPicker'

export default function Page() {
  return (
    <Main title="Relog" className="cont__pages">
      <div className="f5">
        <div className="f5__options">
          <button className="f5__clock button">Hora</button>
          <button className="f5__temporizador button">Temporizador</button>
          <button className="f5__cronometro button">Crónometro</button>
        </div>
        <div>
          <ClockPicker/>
        </div>
      </div>
    </Main>
  );
}
