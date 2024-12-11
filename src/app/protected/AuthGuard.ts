import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthGuard (){
    const pathname = usePathname();

    pages: {
        signIn:'/login'
    }
}