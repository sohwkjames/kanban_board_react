import "./notebox.css";

export default function NoteBox({ note }) {
  return (
    <div className="notebox">
      <div className="left-col">
        <div>From: {note.username}</div>
        <div>State: {note.taskState}</div>
        <div>Time: {note.timestamp}</div>
      </div>
      <div className="right-col">{note.note}</div>
    </div>
  );
}
