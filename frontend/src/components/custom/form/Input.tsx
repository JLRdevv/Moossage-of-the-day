// Css
import style from './Input.module.css';

interface InputProps {
    type: string;
    placeholder?: string;
    labelTitle: string;
    ML?: number
}

export default function Input({ type, placeholder, labelTitle, ML }: InputProps) {
    return (
        <label htmlFor={labelTitle} className={style.inputLabel} >
            {labelTitle}
            <input
                type={type}
                placeholder={placeholder}
                id={labelTitle}
                className={style.inputField}
                maxLength={ML}
            />
        </label>
    );
}