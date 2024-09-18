"use client";

import Link from "next/link";
import { signIn } from "/lib/api";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Button from "@/app/Button";
import Password from "../Password";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const submit = (e, load, finish) => {
        e.preventDefault();
        load();
        signIn(username, password).then(res => {
            if (res.status === "success") {
                router.push("/");
            } else {
                finish();
            }

        });
    };


    return <div className="h-full flex flex-col justify-center min-h-screen">
        <div className="card bg-base-200 w-1/3 m-auto">
            <div className="card-body">
                <h1 className="text-2xl font-bold">Sign in to continue</h1>
                <input placeholder="Username" className="input input-bordered" value={username} onChange={e => setUsername(e.target.value)} />
                <Password placeholder="Password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} />
                <Button className="btn btn-primary" onClick={submit}>Sign in</Button>
                <div className="flex flex-row justify-between">
                    <Link className="link" href="#">Forgot password?</Link>
                    <Link className="link" href={"/signup"}>Don&apos;t have an account?</Link>
                </div>
                <div className="divider">OR</div>
                <button className="btn btn-ghost">Continue as guest</button>
            </div>
        </div>
    </div>;
}