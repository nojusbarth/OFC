/**
 * Stellt der Startpage eine Fehlermeldungsanzeige zur Verfügung
 * @param props
 * @param props.message - Die genaue Fehlermeldung als Text
 * @param props.messageType - Der Typ des Fehlers zur Kategorisierung
 * @returns JSX-Element der Popup-Komponente
 */
export function PopupComponent({ message, messageType }: { message: String; messageType: string; }) {
  return (
    <div className="alert alert-danger" role="alert">
      <b>{messageType}</b><br></br>
      {message}
    </div>
  );
}
