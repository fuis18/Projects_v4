export default function Joined({ data }) {
  return (
    <div className="f4__response__joined">
      <div className="f4__response__joined-group">
        <div className="f4__response__joined-input">
          <div>Nombre:&nbsp;</div>
          <div>{data.name}&nbsp;&nbsp;</div>
        </div>
        <div className="f4__response__joined-input">
          <div>Apellido:&nbsp;</div>
          <div>{data.last}&nbsp;&nbsp;</div>
        </div>
      </div>
      <div className="f4__response__joined-group">
        <div className="f4__response__joined-input">
          <div>Correo:&nbsp;</div>
          <div>{data.mail}&nbsp;&nbsp;</div>
        </div>
      </div>
      <div className="f4__response__joined-group">
        <div className="f4__response__joined-input">
          <div>Asunto:&nbsp;</div>
          <div>{data.about}&nbsp;&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
