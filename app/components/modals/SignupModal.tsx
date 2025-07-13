'use client'

import Modal from "./Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../form/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/action";

const SignupModal = () => {
    const router = useRouter();
    const signupModal = useSignupModal();

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const submitSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            name: 'code',
            email,
            password1,
            password2
        };

        try {
            const response = await apiService.postWithouToken('/api/auth/register/', formData);

            if (response.access) {
                handleLogin(response.user.pk, response.access, response.refresh);
                signupModal.close();
                router.push('/');
            } else {
                // Transforme toutes les valeurs d'erreur en strings, même si ce sont des arrays ou objets
                const tmpErrors: string[] = Object.values(response)
                    .flat()
                    .map(val => typeof val === 'string' ? val : JSON.stringify(val));
                setErrors(tmpErrors);
            }
        } catch (err: any) {
            setErrors(["Erreur serveur ou réseau."]);
            console.error(err);
        }
    };

    const content = (
        <>
            <h2 className="mb-6 text-2xl">Welcome to bnb, please sign up</h2>

            <form onSubmit={submitSignup} className="space-y-4">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your e-mail address"
                    type="email"
                    required
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                />

                <input
                    onChange={(e) => setPassword1(e.target.value)}
                    placeholder="Your password"
                    type="password"
                    required
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                />

                <input
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Repeat your password"
                    type="password"
                    required
                    className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
                />

                {errors.map((error, index) => (
                    <div
                        key={`error_${index}`}
                        className="p-5 bg-airbnb text-white rounded-xl opacity-80"
                    >
                        {error}
                    </div>
                ))}

                <CustomButton label="Submit" type="submit" />
            </form>
        </>
    );

    return (
        <Modal
            isOpen={signupModal.isOpen}
            close={signupModal.close}
            label="Sign up"
            content={content}
        />
    );
};

export default SignupModal;
