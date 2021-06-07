import { useState } from "react";
import axios from "axios";
import Input from "./form/Input";
import validateEmail from "./util/validateEmail";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [emailConsent, setEmailConsent] = useState(false);
    const [submitted, setSubmitted] = useState("");
    const [error, setError] = useState({});

    const formData = [
        {
            name: "name",
            placeholder: "Enter name",
            type: "text",
            label: "Name:",
            value: name,
            onChange: setName,
            errorMessage: "You must enter a name",
        },
        {
            name: "email",
            placeholder: "Enter email",
            type: "text",
            label: "Email:",
            value: email,
            onChange: setEmail,
            errorMessage: "You must enter an email",
        },
        {
            name: "birthdate",
            placeholder: null,
            type: "date",
            label: "Birthdate:",
            value: birthDate,
            onChange: setBirthDate,
            errorMessage: "You must enter a valid birthdate",
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

    const handleValidation = (data) => {
        let results = { errors: {}, disable: false };

        for (let key in data) {
            if (!data[key] && key !== "birthDate") {
                results.errors[key] = "This must be filled out";
                results.disable = true;
            }
        }

        if (data.email && validateEmail(data.email)) {
            results.errors.email = validateEmail(data.email);
            results.disable = true;
        }

        if (results.errors) {
            return results;
        }

        return;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactRequest = {
            body: {
                name,
                email,
                birthDate,
                emailConsent,
            },
        };

        const validate = handleValidation(contactRequest.body);

        if (validate.disable) {
            setError(validate.errors);
            return;
        }

        const jsonContactRequest = JSON.stringify(contactRequest);

        try {
            await axios.post(
                "https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users",
                jsonContactRequest
            );

            setSubmitted("Thank you! We will contact you as soon as possible!");
            handleClear(e);
        } catch (err) {
            setSubmitted("Sorry something went wrong, try again later.");
            console.error(err);
        }
    };

    const handleTextInputs = () =>
        formData.map(({ name, type, placeholder, label, value, onChange }) => {
            return (
                <Input
                    key={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    label={label}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        });

    return (
        <div className="container" style={{ marginTop: 50, width: 400 }}>
            <h2 className="center">Contact Request</h2>
            <form onSubmit={handleSubmit}>
                {handleTextInputs()}
                <div>
                    <label>
                        <input
                            type="checkbox"
                            className="filled-in"
                            checked={emailConsent}
                            onChange={() => setEmailConsent(!emailConsent)}
                        />
                        <span>Do you agree to be contacted?</span>
                    </label>
                    <div className="red-text">{error.emailConsent}</div>
                </div>
                <div style={{ marginTop: 20 }}>
                    <button
                        className="red btn-flat white-text"
                        onClick={(e) => handleClear(e)}
                    >
                        Clear
                        <i className="material-icons left">cancel</i>
                    </button>
                    <button className="teal btn-flat right white-text">
                        Submit
                        <i className="material-icons right">done</i>
                    </button>
                </div>
            </form>
            <div className="green-text center">{submitted}</div>
        </div>
    );
};

export default ContactForm;
