import { useState } from "react";
import Input from "./form/Input";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [emailConsent, setEmailConsent] = useState(false);
    const [error, setError] = useState({});

    const formData = [
        {
            name: "name",
            type: "text",
            label: "Name:",
            value: name,
            onChange: setName,
        },
        {
            name: "email",
            type: "text",
            label: "Email:",
            value: email,
            onChange: setEmail,
        },
        {
            name: "birthdate",
            type: "date",
            label: "Birthdate:",
            value: birthDate,
            onChange: setBirthDate,
        },
    ];

    const handleClear = (e) => {
        e.preventDefault();

        setName("");
        setEmail("");
        setBirthDate("");
        setEmailConsent(false);
        setError({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newContactRequest = {
            name,
            email,
            birthDate,
            emailConsent,
        };

        console.log(newContactRequest);
    };

    const handleTextInputs = () =>
        formData.map(({ name, type, label, value, onChange }) => {
            return (
                <Input
                    key={name}
                    name={name}
                    type={type}
                    label={label}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {handleTextInputs()}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            className="filled-in"
                            checked={emailConsent}
                            onClick={() =>
                                setEmailConsent(emailConsent ? false : true)
                            }
                        />
                        <span>Do you agree to be contacted?</span>
                    </label>
                </div>
                <button
                    className="left btn red"
                    onClick={(e) => handleClear(e)}
                >
                    Clear
                </button>
                <button className="right btn green">Submit</button>
            </form>
        </div>
    );
};

export default ContactForm;
