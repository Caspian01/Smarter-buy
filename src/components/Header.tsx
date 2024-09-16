'use client';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image"

export default function Header({session}:{session:Session|null}) {
    return(
        <header className="border-b p-4 flex items-center justify-between h-16">
            <Link className="text-blue-600 font-bold text-2xl" href="/">SmarterBuy</Link>
            <nav className="flex gap-4 *:rounded  *:py-1">
                <Link href="/new" className="border border-blue-600 px-2 text-blue-600 inline-flex gap-1 items-center px-4 mr-4">
                    <span>Post a product</span>
                </Link>
                <span className="border-r"></span>
                {!session?.user &&(
                    <>
                        <button className="border-0 text-grey-600">Sign Up</button>
                        <button onClick={() => signIn('google')} className="bg-blue-600 text-white border-0 px-4">
                            Login
                        </button>
                    </>
                )}
                {session?.user &&(
                    <>
                        <Link href={'/account'}>
                            <Image src={session.user.image as string} alt={'avatar'} width={34} height={34} className="rounded-md"/>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}