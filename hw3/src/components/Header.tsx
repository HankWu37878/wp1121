import Image from "next/image"
import monkey from "@/assets/monkey.ico";


export default function Header() {
    return (
    <div className="w-full bg-black h-32 flex gap-6">
        <div className="mt-auto mb-auto ml-5">
            <Image src={monkey} alt="" width={50} height={10} />
        </div>
        <div className="text-white text-4xl mt-auto mb-auto tracking-wider">Join me!</div>
    </div>);
}