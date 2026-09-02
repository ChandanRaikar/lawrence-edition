'use client'
import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "../actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import checkBookMarkStatus from "../actions/checkBookMarkStatus";


export default function BookmarkButton({ property }) {

    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isBookMarked, setIsBookMarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false)
            return;
        }
        checkBookMarkStatus(property._id).then((res) => {
            if (res.error) toast.error(res.error)
            if (res.isBookMarked) toast.error(res.isBookMarked)
            setLoading(false);
        })
    }, [property._id, userId, checkBookMarkStatus])

    const handleClick = async () => {
        if (!userId) {
            toast.error("you need to be signed in")
            return;
        }

        bookmarkProperty(property._id).then((res) => {
            if (res.error) return toast.error(res.error);
            setIsBookMarked(res.isBookMarked)
            toast.success(res.msg);
        })
    }


    return isBookMarked ? (
        <div>
            <button className="bg-red-700 hover:bg-red-900 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center mb-4" onClick={handleClick}>
                <FaBookmark className="mr-2" /> Remove from bookmark
            </button>
        </div>
    ) : (
        <div>
            <button className="bg-black hover:bg-gray-800 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center mb-4" onClick={handleClick}>
                <FaBookmark className="mr-2" /> Bookmark this property
            </button>
        </div>
    )

}