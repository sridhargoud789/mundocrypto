// import node module libraries
import { useEffect } from "react";
import { useQuill } from "react-quilljs";

const ReactQuillEditor = (props) => {
  const { initialValue } = props;

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "link"], // toggled buttons

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };

  const { quill, quillRef } = useQuill({
    modules,
  });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(
        initialValue === undefined ? "" : initialValue
      );
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log("Text change event!");
        //console.log(quill.root.innerHTML); // Get innerHTML using quill
        props.onTextEditorChange(quill.root.innerHTML, props.name);
        /* -------------------------------
			possible return values and methods
			----------------------------------
			console.log(quill.getText()); // Get text only
			console.log(quill.getContents()); // Get delta contents
			console.log(quill.root.innerHTML); // Get innerHTML using quill
			console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef */
      });
    }
  }, [quill]);

  return (
    <div style={{ width: "auto", height: "auto", minHeight: "20rem" }}>
      <div ref={quillRef} />
    </div>
  );
};

export default ReactQuillEditor;
