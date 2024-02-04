'use client'

import React, {useState} from 'react';
import {now} from "next-auth/client/_utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

interface AccordionProps {
    // date
    title: string;
    children: React.ReactNode;
    highlightedText?: string;
    isOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({title, highlightedText, isOpen: isOpenProp, children}) => {
    const [isOpen, setIsOpen] = useState(isOpenProp ?? false);

    function getText(text: string) {
        if (!text.toLowerCase().includes(highlightedText?.toLowerCase() ?? '')) return text;
        if (!highlightedText) return text;
        // text before the highlighted text
        const beforeText = text.slice(0, text.toLowerCase().indexOf(highlightedText.toLowerCase()));
        // text highlighted
        const textHighlighted = text.slice(text.toLowerCase().indexOf(highlightedText.toLowerCase()), text.toLowerCase().indexOf(highlightedText.toLowerCase()) + highlightedText.length);
        // text after the highlighted text
        const afterText = text.slice(text.toLowerCase().indexOf(highlightedText.toLowerCase()) + highlightedText.length);

        return (
            <>
                <span>{beforeText}</span>
                <span className='dark:  bg-violet-800 bg-violet-500'>{textHighlighted}</span>
                <span>{afterText}</span>
            </>
        )
    }

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div onClick={toggleOpen} className="border rounded-lg shadow-lg p-4 mb-4">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-2">{getText(title)}</h2> {/* Muestra la fecha */}
                <button className="text-xl">
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown}></FontAwesomeIcon>
                </button>
            </div>
            {isOpen && <div className="mt-4">{children}</div>}
        </div>
    );
};