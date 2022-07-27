import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const MDPreview = ({ src, ...props }: any) => {
  return (
    <div className="markdown-preview">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkBreaks, remarkGfm]}
        {...props}
      >
        {src}
      </ReactMarkdown>
    </div>
  );
};

export default MDPreview;
