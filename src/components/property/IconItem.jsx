import React from "react";
import { IoLogoOctocat } from "react-icons/io";
import { BiArrowBack, BiLogOut, BiFilter, BiSolidUser, BiBook, BiSolidPencil,  } from "react-icons/bi";
import {
    AiOutlineSearch,
    AiOutlineMore,
    AiFillLike,
    AiOutlineClose,
    AiFillCheckCircle,
    AiOutlineBook,
    AiFillSetting,
    AiFillCalendar,
} from "react-icons/ai";



const iconMap = {
    // Bi 아이콘
    BiArrowBack: BiArrowBack,
    BiLogOut: BiLogOut,
    BiFilter: BiFilter,
    BiSolidUser: BiSolidUser,
    book: BiBook, BiSolidPencil: BiSolidPencil,

    // Ai 아이콘
    AiOutlineSearch: AiOutlineSearch,
    AiOutlineMore: AiOutlineMore,
    AiFillLike: AiFillLike,
    AiOutlineClose: AiOutlineClose,
    AiFillCheckCircle: AiFillCheckCircle,
    AiOutlineBook: AiOutlineBook,
    AiFillSetting: AiFillSetting, AiFillCalendar: AiFillCalendar, 

    //Io 아이콘
    IoLogoOctocat: IoLogoOctocat,
};

function IconItem({ type = "BiArrowBack", isActived = false, size = 20 }) {
    const IconComponent = iconMap[type] || BiArrowBack;

    const colorClass = isActived ? "text-gray-10" : "text-gray-50";

    return (
        <div className={`flex items-center justify-center ${colorClass}`}>
            <IconComponent size={size} />
        </div>
    );
}

export default IconItem;
