import { useEffect } from "react";

type DocumentTitleProps = { title: string };

const DocumentTitle: React.FC<DocumentTitleProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default DocumentTitle;
