const Input = ({ name, type, placeholder, label, value, onChange, error }) => {
    return (
        <div>
            <label>
                <span>{label}</span>
                <input
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    max={new Date().toLocaleDateString("fr-CA")}
                />
            </label>
            <div className="red-text">{error[name]}</div>
        </div>
    );
};

export default Input;
