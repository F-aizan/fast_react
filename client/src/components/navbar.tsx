import { NavLink } from "react-router-dom"
import { Create } from "./createRecord"
import Edit from "./Editrecord"
import image from "../assets/image.jpg"

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-url[]">
            <div>
                <NavLink to={'/'}>Items</NavLink>
            </div>
            <div>
                <NavLink to={"/create"}>Create</NavLink>
            </div>
        </nav>
    )

}

export default Navbar