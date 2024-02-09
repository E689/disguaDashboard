import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faFilter} from "@fortawesome/free-solid-svg-icons";
import {Input} from "@/components/ui/input";
import {ChangeEvent} from "react";

type SearchBarProps = {
    // any function
    onInput: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder: string;
    dropdownElements: React.ReactNode;
}

export const SearchBar = ({onInput, placeholder, dropdownElements}: SearchBarProps) => {
    return (
        <div className='flex gap-5 items-center'>
            {/** Convertir acordeon a comp propio/reutilizable */}
            <Input onInput={onInput} className='w-[50ch]' placeholder={placeholder}></Input>
            {/* on click should display dropdown, idk if its better to use shadcdn component for this*/}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {/* DropdownElements */}
                    {dropdownElements}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}