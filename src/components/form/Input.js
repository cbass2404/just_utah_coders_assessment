const Input = ({ name, type, label, value, onChange, error }) => {
    return (
        <div>
            <label>
                {label}
                <input
                    placeholder={type !== "checkbox" ? name : null}
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>
            {error[name]}
        </div>
    );
};

export default Input;
