import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Gaya default dari Quill
import "react-quill/dist/quill.bubble.css"; // Gaya bubble dari Quill (opsional)
import PropTypes from "prop-types";

const RichTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  return (
    <div>
      <ReactQuill
        className="h-48 text-black"
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
