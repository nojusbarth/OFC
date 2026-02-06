interface PopupComponentProps {
  // Props
  message: String;
  messageType: string;
}

export default function PopupComponent({message, messageType}: PopupComponentProps) {
  return (
  <div className="alert alert-primary" role="alert">
    <b>{messageType}</b><br></br>
    {message}
  </div>
  );
}
