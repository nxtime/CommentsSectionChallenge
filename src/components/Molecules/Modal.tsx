import React, { memo, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: PropsWithChildren) => {
    const documentEl = document.getElementById('modal-root')
    return (
        <React.Fragment>
            {
                createPortal(
                    <div
                        className="h-screen w-full bg-black/50 flex items-center justify-center"
                    >
                        {children}
                    </div>,
                    documentEl!
                )
            }
        </React.Fragment>
    )
}

export default memo(Modal);