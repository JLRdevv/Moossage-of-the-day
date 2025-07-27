// Css
import style from './formBody.module.css';

// Components
import Button from '../../motd/Button';

interface FormBodyProps {
    children: React.ReactNode;
    handleSubmit?: (event: React.FormEvent) => void;
}

export default function FormBody({ children, handleSubmit }: FormBodyProps) {
    return (
        <form className={style.formBody} onSubmit={handleSubmit}>
            {children}
            <Button
                text="Submit"
                icon={<i className="bi bi-caret-right" />}
                iconOnHover={<i className="bi bi-caret-right-fill" />}
                isSubmit={true}
            />
        </form>
    );
}