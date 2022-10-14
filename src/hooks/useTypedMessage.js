import React, { useEffect, useState } from "react";
import wait from "../helpers/helpers";

const useTypedMessage = (message) => {

    const [typedMessage, setTypedMessage] = useState('');

    useEffect(() => {
        setTypedMessage('');

        if (message.length) {
            (async () => {
                let currentMessage = '';
                for (let i = 0; i < message.length; i++) {
                    await wait(30);
                    currentMessage = currentMessage + message[i];
                    setTypedMessage(currentMessage);
                }
            })();
        }
    }, [message]);

    return typedMessage;
}

export default useTypedMessage;