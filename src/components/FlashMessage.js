import React from "react";

/**
 * Creates a flash message component
 * @component
 * @param theme Color of background in bootstrap
 * @param text Text of the message
 * @returns {JSX.Element} The rendered flash message
 * @constructor makes an instance of flash message
 */
export function FlashMessage({ theme, text }) {
  return <div className={"alert alert-" + theme}>{text}</div>;
}

export default FlashMessage;
