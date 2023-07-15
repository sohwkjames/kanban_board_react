import { colourScheme } from "../../utils/colorScheme";
import "./notebox.css";

export default function NoteBox({ note }) {
  console.log("note", note);
  return (
    <div className="notebox">
      <div>
        <span
          className="notebox-username"
          style={{
            color: colourScheme.darkBlue,
            fontWeight: "bold",
            paddingRight: "1em",
          }}
        >
          {note.username}:
        </span>
        <span>{note.note}</span>
      </div>
      <div className="timestamps">
        <span>
          <span style={{ fontWeight: "bold" }}>State: </span>
          {note.taskState}
        </span>
        <span>
          <span style={{ fontWeight: "bold" }}>Time: </span>
          {note.timestamp}
        </span>
      </div>
    </div>
    // <div className="notebox">
    //   <div className="left-col">
    //     <div>From: {note.username}</div>
    //     <div>State: {note.taskState}</div>
    //     <div>Time: {note.timestamp}</div>
    //   </div>
    //   <div className="right-col">{note.note}</div>
    // </div>
  );
}
