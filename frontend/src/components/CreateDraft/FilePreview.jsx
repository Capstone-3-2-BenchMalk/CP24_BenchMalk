import cancelIcon from "../../assets/icons/cancel-icon.svg";

function FilePreview({ file, onCancel }) {
  return (
    <div className="cd-filePreview">
      <span className="cd-filePreview-title">{file.name}</span>
      <button className="cd-filePreview-cancelbutton" onClick={onCancel}>
        <img src={cancelIcon} alt="cancel file" />
      </button>
    </div>
  );
}

export default FilePreview;
