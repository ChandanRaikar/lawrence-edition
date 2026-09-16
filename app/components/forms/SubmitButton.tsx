import { FaPaperPlane } from "react-icons/fa"
import { useFormStatus } from "react-dom";
export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (<div>
        <button
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
            disabled={pending}
        >
            <FaPaperPlane className="mr-2" /> {pending ? 'Sending...' : 'Send Message'}
        </button>
    </div>)
}