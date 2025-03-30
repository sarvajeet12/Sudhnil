import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

const navLinks = [
    {
        icon: FaHome,
        link: "Home",
        path: "/"
    },
    {
        icon: FaHeart,
        link: "Wishlist",
        path: "/wishlist"
    },
    {
        icon: BiSolidCategory,
        link: "Categories",
        path: "/categories"
    },
    {
        icon: FaShoppingCart,
        link: "Cart",
        path: "/cart"
    },
    {
        icon: IoIosNotifications,
        link: "Notification",
        path: "/notification"
    },
    {
        icon: IoPerson,
        link: "Profile",
        path: "/profile"
    }

]


export default navLinks;