/**
 * Stellt der Startpage eine Fehlermeldungsanzeige zur Verfügung.
 */
interface PopupComponentProps {
  // Props
  message: String;
  messageType: string;
}

/**
 * Gibt eine Fehlermeldungsanzeige zurück.
 * @param message die genaue Fehlermessage
 * @param messageType der Typ des Fehlers
 * @constructor
 */
export default function PopupComponent({message, messageType}: PopupComponentProps) {
  return (
  <div className="alert alert-primary" role="alert">
    <b>{messageType}</b><br></br>
    {message}
  </div>
  );
}
