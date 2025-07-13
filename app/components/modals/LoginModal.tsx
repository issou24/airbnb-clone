'use client'

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import CustomButton from "../form/CustomButton";
import { handleLogin } from "@/app/lib/action";
import apiService from "@/app/services/apiService";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitLogin = async (e?: React.FormEvent) => {
        e?.preventDefault(); // ← empêche le rechargement

        setErrors([]);

        const formData = {
            email,
            password,
        };

        try {
            const response = await apiService.postWithouToken('/api/auth/login/', formData);

            if (response.access) {
                await handleLogin(response.user.pk, response.access, response.refresh);
                loginModal.close();
                router.push('/');
            } else {
                const errorMessages: string[] = [];

                for (const [key, value] of Object.entries(response)) {
                    if (Array.isArray(value)) {
                        errorMessages.push(`${key}: ${value.join(', ')}`);
                    } else {
                        errorMessages.push(`${key}: ${value}`);
                    }
                }

                setErrors(errorMessages);
            }
        } catch (error: any) {
            console.error('Erreur login:', error);
            setErrors(['Erreur serveur. Veuillez réessayer.']);
        }
    };

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to bnb, please log in</h2>

            <form onSubmit={submitLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Your e-mail address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />

                <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                    required
                />

                {errors.map((error, index) => (
                    <div
                        key={`error_${index}`}
                        className="p-5 bg-red-500 text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                ))}

                <CustomButton label="Submit" onClick={submitLogin} />
            </form>
        </>
    );

    return (
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    );
};

export default LoginModal;



