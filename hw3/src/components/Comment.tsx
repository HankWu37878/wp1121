type CommentProps = {
    AuthorName: string;
    content: string;
}

export default function Comment({AuthorName, content}: CommentProps) {
    return (
    <div className="bg-gray-200 flex py-4 px-4 rounded-md gap-4">
        <div className="text-xl font-semibold my-auto tracking-wider w-1/6">{AuthorName} ：</div>
        <div className="my-auto">{content}</div>
    </div>);
}