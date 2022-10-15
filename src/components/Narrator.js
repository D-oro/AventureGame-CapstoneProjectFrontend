import React from "react";
import useTypedMessage from "../hooks/useTypedMessage";

const Narrator = ({message}) => {

    const typedMessage = useTypedMessage(message)

        return (
            <div>{typedMessage}</div>
        );
        
};

export default Narrator;