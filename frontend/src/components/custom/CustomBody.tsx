// Libs
import { useState } from 'react';

// Components
import Card from './Card';
import FormBody from './form/FormBody';
import Input from './form/Input';
import Button from '../motd/Button';
import { SyncLoader } from 'react-spinners';
import FlashMessage from '../layout/FlashMessage';

// Utils
import Api from '../../utils/Api';

// Css
import style from './customBody.module.css';

export default function CustomBody() {
    const [customMessage, setCustomMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const [flashmessage, setFlashMessage] = useState('');
    const [type, setType] = useState<string>('');
    const [icon, setIcon] = useState<React.ReactNode>(<i className="bi bi-check-circle-fill"></i>);
    const [isVisible, setIsVisible] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        let message = (event.target as HTMLFormElement).elements.namedItem('Moossage') as HTMLInputElement;
        let eyes = (event.target as HTMLFormElement).elements.namedItem('Eyes') as HTMLInputElement;
        let tongue = (event.target as HTMLFormElement).elements.namedItem('Tongue') as HTMLInputElement;
        const response = await Api.post('/custom/make', {
            message: message.value || "Say something!",
            eyes: eyes.value || '',
            tongue: tongue.value || ''
        });
        if (response.data && response.data.data) {
            setCustomMessage(response.data.data);
            setLoading(false);
        } else {
            console.error('Error generating custom message:', response);
        }
    }

    function handleCopy() {
        navigator.clipboard.writeText(customMessage || "");
        setFlashMessage("Moossage copied to clipboard!");
        setType("success");
        setIcon(<i className="bi bi-clipboard-check-fill"></i>);
        setIsVisible(true);
    }

    return (
        <div className={style.customBody}>
            <Card>
                <h1 className={style.title}>Create a custom moossage!</h1>
                <FormBody handleSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Enter your moossage"
                        labelTitle="Moossage"
                        ML={100}
                    />
                    <div className={style.inputContainer}>
                        <Input
                            type="text"
                            placeholder="oo"
                            labelTitle="Eyes"
                            ML={5}
                        />
                        <Input
                            type="text"
                            labelTitle="Tongue"
                            ML={5}
                        />
                    </div>
                </FormBody>
            </Card>
            <Card>
                {!customMessage ? (
                    <h1 className={style.title}>Go ahead, say something!</h1>
                ) : (
                    <h1 className={style.title}>Your custom moossage:</h1>
                )}

                {!customMessage ? (
                    <pre className={style.preResult}>
                        {` ________________
< Say something! >
 ----------------
     \\   ^__^
      \\  (oo)\\_______
         (__)\\       )\\/\\
             ||----w |
             ||     ||`}
                    </pre>
                ) : loading ? (
                    <SyncLoader color="#ffffffff" />
                ) : (
                    <pre className={style.preResult}>
                        {customMessage}
                    </pre>
                )}
                <div className={style.buttonContainer}>
                    {customMessage ? (
                        <Button
                            text="Copy"
                            onclick={handleCopy}
                            icon={<i className="bi bi-clipboard"></i>}
                            iconOnHover={<i className="bi bi-clipboard-check-fill"></i>}
                        />
                    ) : (
                        <Button
                            text="Copy"
                            onclick={handleCopy}
                            icon={<i className="bi bi-clipboard"></i>}
                            iconOnHover={<i className="bi bi-clipboard-check-fill"></i>}
                            disabled={true}
                        />
                    )}

                </div>
            </Card>
            <FlashMessage
                message={flashmessage}
                type={type}
                icon={icon}
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
            />
        </div>
    );
}
