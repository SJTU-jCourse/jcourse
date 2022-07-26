import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const MDPreview = ({ src, ...props }: any) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSanitize]}
      remarkPlugins={[remarkBreaks, remarkGfm]}
      {...props}
    >
      {src}
    </ReactMarkdown>
  );
};

export default MDPreview;
