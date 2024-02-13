import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Dispatch, SetStateAction} from "react";

type DropdownMenuItemsProps = {
    setTypeSearch: Dispatch<SetStateAction<"fecha" | "paciente">>;
    typeSearch: "fecha" | "paciente"
}

const possibleSearchTypes = ['fecha', 'paciente'];

export const DropdownMenuItems = ({typeSearch, setTypeSearch}: DropdownMenuItemsProps) => {
    return possibleSearchTypes.map((type, index) => (
        <DropdownMenuItem className='flex justify-between cursor-pointer' key={index}
                          onSelect={() => {
                              setTypeSearch(type as 'fecha' | 'paciente');
                          }}>
            <span>{type}</span>
            {type === typeSearch &&
                <span><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></span>}
        </DropdownMenuItem>
    ));
}

